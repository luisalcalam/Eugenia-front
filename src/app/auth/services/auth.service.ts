import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import {
  loginResponse,
  RefreshTokenResponse,
  TokenInterface,
} from '../interfaces/login-response.interface';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { RegisterRequest } from '../interfaces/register-request';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Token } from '../classes/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.isAuthenticated().subscribe();
  }

  private setAuthentication(resp: loginResponse): boolean {
    const { user, session } = resp;
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    this.tokenService.set(Token.tokenJson(session.accessToken));
    this.tokenService.setRefresh(Token.tokenJson(session.refreshToken));
    localStorage.setItem('eugenia-user', JSON.stringify(user));

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

  register(request: RegisterRequest): Observable<boolean> {
    const url = `${this.baseUrl}/users`;

    return this.http.post<RegisterResponse>(url, request).pipe(
      map(() => true),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('eugenia-token');
    const user = localStorage.getItem('eugenia-user');

    if (!token || !user) {
      this.logout();
      return of(false);
    }
    this._authStatus.set(AuthStatus.authenticated);

    return of(true);
  }

  refreshToken(): Observable<TokenInterface> {
    const url = `${this.baseUrl}/auth/refresh`;
    const refresh = this.tokenService.getRefresh()?.getValue as string;
    const headers = new HttpHeaders({ 'refresh-token': refresh });
    return this.http.post<RefreshTokenResponse>(url, {}, { headers }).pipe(
      map((resp) => {
        this.tokenService.set(Token.tokenJson(resp.accessToken));
        return resp.accessToken;
      }),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  logout() {
    localStorage.removeItem('eugenia-token');
    localStorage.removeItem('eugenia-refresh-token');
    localStorage.removeItem('eugenia-user');
    this.router.navigate(['auth']);
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
