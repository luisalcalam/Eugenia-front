import { DateTime } from 'luxon';
import { TokenInterface } from '../interfaces/login-response.interface';

export class Token {
  static tokenJson(obj: TokenInterface) {
    return new Token(
      obj['token'],
      DateTime.fromISO(obj['createdAt']),
      DateTime.fromISO(obj['expiresIn'])
    );
  }
  constructor(
    private _token: string,
    private _created_at: DateTime,
    private _expires_in: DateTime
  ) {}

  get getValue(): string {
    return this._token;
  }

  get createdAt(): DateTime {
    return this._created_at;
  }

  get expiresIn(): DateTime {
    return this._expires_in;
  }

  get isValid(): boolean {
    return !!this.getValue && this._created_at < this._expires_in;
  }

  get tokenRaw(): TokenInterface {
    return {
      token: this.getValue,
      expiresIn: this.expiresIn.toISO() as string,
      createdAt: this.createdAt.toISO() as string,
    };
  }
}
