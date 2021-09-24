const rewire = require("rewire");
const script = rewire("./script");
const generatePassword = script.__get__("generatePassword");
// @ponicode
describe("generatePassword", () => {
  test("0", () => {
    let callFunction = () => {
      generatePassword();
    };

    expect(callFunction).not.toThrow();
  });
});
