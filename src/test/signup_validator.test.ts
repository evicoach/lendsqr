import Joi from "joi";
import { describe, expect, it } from "vitest";
import { Validator } from "../util/validator";
describe("Validate registration inputs to the service", () => {
  it("should validate required data user registration", () => {
    // given
    const signupSchema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).alphanum().required(),
      dob: Joi.date().required(),
      sex: Joi.string().valid("male", "female", "not sure").required(),
    });
    // expected result
    const expectedResult = [
      { key: "firstName", message: "firstName is required" },
      { key: "lastName", message: "lastName is required" },
      { key: "email", message: "email is required" },
      { key: "password", message: "password is required" },
      { key: "dob", message: "dob is required" },
      { key: "sex", message: "sex is required" },
    ];
    const result = Validator.validate(signupSchema, {});
    expect(result).toStrictEqual(expectedResult);
  });
});
