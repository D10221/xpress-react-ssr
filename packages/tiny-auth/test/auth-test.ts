import Auth from "../src";
let tokens: string[] = []
interface User { id: string, password: string };

const users: User[] = [
    { id: "admin", password: "admin" }
];

const authOptions = {
    hostName: "localhost",
    expInSeconds: 60 * 60,
    secret: "abracadabra",
};
/** */
const auth = Auth<User, keyof User>({
    ...authOptions,
    isRevoked: async (id) => !!tokens.find(x => x === id),
    findUser: async (id) => users.find(x => x && x.id === id),
    revokeToken: async (id) => { tokens = tokens.filter(x => x !== id); },
    profileIdKey: "id"
})

function runMiddleware(token: string, authSchema: "Bearer" | "Basic" = "Bearer") {
    return new Promise<void>((resolve, reject) => {
        auth.middleware({ headers: { authorization: `${authSchema} ${token}` } } as any, {} as any, (error) => {
            if (error) return reject(error);;
            resolve();
        });
    })
}
/** ? */
describe("auth middleware", () => {
    /** */
    it("should Authorize", async () => {
        const params = auth.signParamsFromUser({ id: "admin", password: "" });
        const token = auth.sign(params);
        const error = await runMiddleware(token).catch(error => error);       
        expect(error && error.message).toBeFalsy();
    });
    // ...
    it("should not Authorize", async () => {
        const params = auth.signParamsFromUser({ id: "admin", password: "" });
        params.audience = "*";
        params.issuer = "*";
        const token = auth.sign(params);
        const error = await runMiddleware(token).catch(error => error);
        if (error && error.reason) console.log("Reason: %s", error.reason);
        expect(error && error.message).toBeTruthy();
    });
})
