describe("local-db", () => {
    it("works", async () => {
        process.env.DB = "users.db";
        const db = await (await import("../src")).default;
        expect(db).toBe(await (await import("../src")).default);
        expect(db).toBe(await (await import("../src")).default);
        expect(db).toBe((await import("../src")).default.instance());
    })
})