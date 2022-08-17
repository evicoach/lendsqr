import Joi from "joi";
import { describe, expect, it } from "vitest";
import { Validator } from "../util/validator";
describe("Validate fund transfer inputs", () => {
  it("should return to, amount and description is required", () => {
    // given
    const transferSchema = Joi.object({
      to: Joi.number().required(),
      amount: Joi.number().required(),
      description: Joi.string().required(),
    });
    // expected result
    const expectedResult = [
      { key: "to", message: "to is required" },
      { key: "amount", message: "amount is required" },
      { key: "description", message: "description is required" },
    ];
    const result = Validator.validate(transferSchema, {});
    expect(result).toStrictEqual(expectedResult);
  });
});
