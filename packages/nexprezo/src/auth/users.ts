export interface User {
  username: string;
  password: string;
  displayName: string;
  email: string;
  roles: string[];
}
const users: User[] = [
  {
    username: "admin",
    password: "admin",
    displayName: "admin",
    email: "admin@localhost",
    roles: ["admin"]
  }
];

export function find(username: string): Promise<User | null | undefined> {
  const { ...found } = users.find(u => u.username === username);
  if (found) {
    delete found.password;
  }
  return Promise.resolve(found);
}
export async function validate(
  username: string,
  password: string
): Promise<User | null | undefined> {
  return users.find(u => u.username === username && u.password === password);
}
export default {
  find,
  validate
};
