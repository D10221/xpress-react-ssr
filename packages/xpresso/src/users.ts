const admin = {
  username: "admin",
  password: "admin",
  displayName: "admin"
};
export function getId(u?: { id?: string }): string | null {
  return (u && u.id) || null;
}
export function find(username: string) {
    const user = (username === admin.username && admin) || null;
    return Promise.resolve(user);
}
export async function validate(username: string, password: string) {
    const u = await find(username);
    if(!u || u.username!== username ||  u.password !== password){
        return null
    }
    return u;
}
const users = {
  find,
  validate,
  getId
};

export default users;
