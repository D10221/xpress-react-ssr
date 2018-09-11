export interface User {
  id: string;
  displayName: string;
  email: string;
  roles: string;
  password: string;
  disabled: boolean;
  createdAt: Date;
  upgradedAt: Date;
}
export interface Crypto {
  encrypt(text: string): string;
  decrypt(text: string): string;
}
