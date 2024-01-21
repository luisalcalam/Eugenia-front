import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { loginResponse } from '../interfaces/login-response.interface';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // public currentUser = computed( () => this._currentUser() );
  // public authStatus = computed( () => this._authStatus() );

  constructor() {
    // this.checkAuthStatus().subscribe();
  }

  private setAuthentication(resp: loginResponse): boolean {
    console.log({ resp });
    const { user, session } = resp;
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('eugenia-token', session.accessToken);
    localStorage.setItem('eugenia-refresh-token', session.refreshToken);

    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<loginResponse>(url, body).pipe(
      map((resp) => this.setAuthentication(resp)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  // checkAuthStatus():Observable<boolean> {

  //   const url   = `${ this.baseUrl }/auth/check-token`;
  //   const token = localStorage.getItem('token');

  //   if ( !token ) {
  //     this.logout();
  //     return of(false);
  //   }

  //   const headers = new HttpHeaders()
  //     .set('Authorization', `Bearer ${ token }`);

  //     return this.http.get<CheckTokenResponse>(url, { headers })
  //       .pipe(
  //         map( ({ user, token }) => this.setAuthentication( user, token )),
  //         catchError(() => {
  //           this._authStatus.set( AuthStatus.notAuthenticated );
  //           return of(false);
  //         })
  //       );

  // }

  // logout() {
  //   localStorage.removeItem('token');
  //   this._currentUser.set(null);
  //   this._authStatus.set( AuthStatus.notAuthenticated );

  // }
}
