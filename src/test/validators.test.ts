import Joi from "joi";
import { describe, expect, it } from "vitest";
import { Validator } from "../util/validator";
describe("Validate inputs to the service", () => {
  it("should return username is required", () => {
    // given
    const loginSchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    // expected result
    const expectedResult = [
      { key: "username", message: "username is required" },
      { key: "password", message: "password is required" },
    ];
    const result = Validator.validate(loginSchema, {});
    expect(result).toStrictEqual(expectedResult);
  });
});
