import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, empty, Observable } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  take,
  switchMap,
  tap,
} from 'rxjs/operators';
import { DateTime } from 'luxon';
import { TokenService } from '../../auth/services/token.service';
import { AuthService } from '../../auth/services/auth.service';
import { Token } from '../../auth/classes/token';
import { TokenInterface } from '../../auth/interfaces/login-response.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isRefreshing) {
      return next.handle(request);
    }
    if (this.tokenService.get()) {
      console.log('Entro');
      const token: string = this.tokenService.get()!.getValue;
      request = this.addToken(request, token);
    }

    console.log(request.headers);
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return this.handle401Error(err, request, next);
        }
        return next.handle(request);
      })
    );
  }

  private addToken(
    request: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  private handle401Error(
    err: HttpErrorResponse,
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    // if (this.isRefreshing) {
    //   return this.refreshTokenSubject.pipe(
    //     filter(token => token != null),
    //     take(1),
    //     switchMap(jwt => {
    //       return next.handle(this.addToken(request, jwt));
    //     }));
    // }
    if (err.status !== 401 && err.status !== 404) {
      this.redirectToLogin();
      // return throwError(err);
      return empty();
    }
    const refresh = this.tokenService.getRefresh();
    const now = DateTime.now();
    const diff = refresh?.expiresIn.diff(now, ['minutes']);
    if (!refresh && !refresh!.isValid) {
      this.redirectToLogin();
      return empty();
    }
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);
    return this.authService.refreshToken().pipe(
      catchError((errr: HttpErrorResponse) => {
        // this.isRefreshing = false;
        // this.refreshTokenSubject.next('');
        this.redirectToLogin();
        return empty();
      }),
      // tap( (data) => {
      //   this.isRefreshing = false;
      //   this.refreshTokenSubject.next(data.token.jwt);
      // }),
      concatMap((data: TokenInterface) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(data.token);
        this.tokenService.set(Token.tokenJson(data));
        // if (diff!.minutes < 30) {
        //   this.authService.getNewRefreshToken();
        // }
        request = this.addToken(request, data.token);
        return next.handle(request);
      })
    );
  }

  private redirectToLogin(): void {
    // this.messageService.errorMessage('Ocurrió un error de sesión. Por favor inicie sesión nuevamente');
    setTimeout(() => {
      this.authService.logout();
    }, 1000);
  }
}
