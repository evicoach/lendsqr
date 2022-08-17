import Joi from "joi";
import { describe, expect, it } from "vitest";
import { Validator } from "../util/validator";
describe("Validate login inputs to the service", () => {
  it("should return username and password is required", () => {
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
      it("should return username is required", () => {
        // given
        const loginSchema = Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
        });
        // expected result
        const expectedResult = [
          { key: "username", message: "username is required" },
        ];
          const result = Validator.validate(loginSchema, {
            password: "password"
        });
        expect(result).toStrictEqual(expectedResult);
      });
          it("should return password is required", () => {
            // given
            const loginSchema = Joi.object({
              username: Joi.string().required(),
              password: Joi.string().required(),
            });
            // expected result
            const expectedResult = [
              { key: "password", message: "password is required" },
            ];
            const result = Validator.validate(loginSchema, {
              username: "username",
            });
            expect(result).toStrictEqual(expectedResult);
          });
});
