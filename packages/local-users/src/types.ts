export interface User {
  id: string;
  displayName: string;
  email: string;
  roles: string| string[];
  password: string;
  disabled: boolean;
  createdAt: Date;
  upgradedAt: Date;
}