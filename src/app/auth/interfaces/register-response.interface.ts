import { UserRole } from './user.interface';
export interface RegisterResponse {
  id: string;
  name: string;
  surname: string;
  secondSurname: string;
  email: string;
  avatar: string;
  role: UserRole;
  enable: boolean;
  apartment: string;
}
