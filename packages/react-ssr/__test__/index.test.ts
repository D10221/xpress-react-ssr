import { join } from "path";
describe(require(join(__dirname, "..", "package.json")).name, () => {
    it("TODO: Should Work", () => {
        expect("TODO").toBe("TODO");
    })
});