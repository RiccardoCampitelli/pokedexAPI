import { Result } from "./result";

describe("result", () => {
  describe("Given a success result", () => {
    let result: Result<unknown, unknown>;

    let success = 10;

    beforeEach(() => {
      result = new Result<unknown, unknown>({ success: success });
    });

    test("When accessing failure value Then an error is thrown", () => {
      expect(() => result.failure).toThrow();
    });

    test("When accessing success value, then correct value is returned", () => {
      expect(result.success).toBe(success);
    });

    test("Then isSuccess is true", () => {
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("Given a failure result", () => {
    let result: Result<unknown, unknown>;

    let failure = "Oh no";

    beforeEach(() => {
      result = new Result<unknown, unknown>({ failure: failure });
    });

    test("When accessing failure value Then correct value is returned", () => {
      expect(result.failure).toBe(failure);
    });

    test("When accessing success value, Then an error is thrown", () => {
      expect(() => result.success).toThrow();
    });

    test("Then isSuccess is false", () => {
      expect(result.isSuccess).toBe(false);
    });
  });
});
