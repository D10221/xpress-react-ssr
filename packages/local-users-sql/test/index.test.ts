import sqlite, { Database } from "sqlite";

const crypto = {
    encrypt(text) {
        return text;
    },
    decrypt(text) {
        return text;
    }
};

let db: Database;
beforeAll(async () => {
  db = await sqlite.open(":memory:", { verbose: true });
});

describe("users", () => {
  it("works", async () => {
    const { default: _users } = await import("../src");
    const users = await _users(db, crypto);
    const user = await users.byId("admin");
    expect(user.id).toBe("admin");
    const r = await users.add({
      id: "bob",
      displayName: "Bob",
      password: "bob",
      email: "bob@localhost",
      roles: ["user"]
    });
    expect((await users.byId("bob")).id).toBe("bob");
  });
  it("updates", async () => {
    const { default: _users } = await import("../src");
    const users = await _users(db, crypto);
    await users.update({ id: "admin", displayName: "Admin1" });
    expect((await users.byId("admin")).displayName).toBe("Admin1");
  });
  /** */
  it("finds", async () => {
    const { default: _users } = await import("../src");
    const users = await _users(db, crypto);
    expect(
      (await users.find(
        ({ id, roles, password }) =>
          id === "admin" && roles.indexOf("admin") !== -1 && password === ""
      ))[0].id
    ).toBe("admin");
    expect(
      (await users.find(({ id, password }) => {
        return id === "bob" && password === "bob";
      }))[0].id
    ).toBe("bob");
  });

  /** */
  it("finds filtered", async () => {
    const { default: _users } = await import("../src");
    const users = await _users(db, crypto);
    expect(
      (await users.find(
        " id = 'admin'",
        ({ roles, password }) =>
          roles.indexOf("admin") !== -1 && password === ""
      ))[0].id
    ).toBe("admin");
    expect(
      (await users.find(({ id, password }) => {
        return id === "bob" && password === "bob";
      }))[0].id
    ).toBe("bob");
  });

  it("finds Where", async () => {
    const { default: _users } = await import("../src");
    const users = await _users(db, crypto);
    expect((await users.find(`id = '${"admin"}'`))[0].id).toBe("admin");
    expect(
      (await users.find(({ id, password }) => {
        return id === "bob" && password === "bob";
      }))[0].id
    ).toBe("bob");
  });
});
