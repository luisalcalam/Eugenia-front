import { User } from './user.interface';
export interface RefreshTokenResponse {
  accessToken: TokenInterface;
}

export interface loginResponse {
  user: User;
  session: Session;
}

export interface LoginResponse2 {
  user: User;
  session: Session;
}

export interface Session {
  accessToken: TokenInterface;
  refreshToken: TokenInterface;
}

export interface TokenInterface {
  token: string;
  expiresIn: string;
  createdAt: string;
}
