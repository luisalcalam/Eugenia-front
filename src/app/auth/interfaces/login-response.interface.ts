import { User } from './user.interface';
export interface Session {
  accessToken: string;
  refreshToken: string;
}

export interface loginResponse {
  user: User;
  session: Session;
}
