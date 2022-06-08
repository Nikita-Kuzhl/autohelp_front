export interface Roles {
  id: number;
  value: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserInfo {
  id: number;
  email: string;
  name: string;
  telephone: string;
  password: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  roles: Roles;
}
export interface IUpdateUser {
  id: number;
  telephone: string;
  name: string;
  email: string;
  roleId: number;
}
