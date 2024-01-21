export enum UserRole {
  SUPER_ADMIN = 'superAdmin',
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
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
