import { Users } from "../src";

let users: Users;
beforeAll(async () => {
  const { default: init } = await import("../src/init");
  await init;
  users = (await import("../src")).default;
  console.log(users);
})

describe("users", () => {
  it("works", async () => {
    const user = await users.findById("admin");
    expect(user.id).toBe("admin");
    const r = await users.add({
      id: "bob",
      displayName: "Bob",
      password: "bob",
      email: "bob@localhost",
      roles: ["user"]
    });
    expect((await users.findById("bob")).id).toBe("bob");
  });
  it("updates", async () => {

    await users.update({ id: "admin", displayName: "Admin1" });
    expect((await users.findById("admin")).displayName).toBe("Admin1");
  });
  /** */
  it("finds", async () => {
    const found = await users.find(
      ({ id, roles, password }) => id === "admin" && roles.indexOf("admin") !== -1 && password === ""
    );
    expect(found[0].id).toBe("admin");
    expect(
      (await users.find(({ id, password }) => {
        return id === "bob" && password === "bob";
      }))[0].id
    ).toBe("bob");
  });

  /** */
  it("finds filtered", async () => {
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
    expect((await users.find(`id = '${"admin"}'`))[0].id).toBe("admin");
    expect(
      (await users.find(({ id, password }) => {
        return id === "bob" && password === "bob";
      }))[0].id
    ).toBe("bob");
  });
});
