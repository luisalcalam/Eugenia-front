import { Injectable } from '@angular/core';
import { Token } from '../classes/token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  protected key: string = 'eugenia-token';
  protected refreshkey: string = 'eugenia-refresh-token';

  constructor() {}

  set(token: Token): void {
    localStorage.setItem(this.key, JSON.stringify(token.tokenRaw));
  }

  get(): Token | null {
    if (localStorage.getItem(this.key)) {
      return Token.tokenJson(JSON.parse(localStorage.getItem(this.key)!));
    }
    return null;
  }

  delete() {
    localStorage.removeItem(this.key);
  }

  setRefresh(token: Token): void {
    localStorage.setItem(this.refreshkey, JSON.stringify(token.tokenRaw));
  }

  getRefresh(): Token | null {
    if (localStorage.getItem(this.refreshkey)) {
      return Token.tokenJson(
        JSON.parse(localStorage.getItem(this.refreshkey)!)
      );
    }
    return null;
  }

  deleteRefresh() {
    localStorage.removeItem(this.refreshkey);
  }
}
