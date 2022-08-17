import Joi from "joi";
import { describe, expect, it } from "vitest";
import { Validator } from "../util/validator";
describe("Validate widthrawal inputs", () => {
  it("should return amount is required", () => {
    // given
    const widthrawSchema = Joi.object({
      amount: Joi.number().required(),
    });
    // expected result
    const expectedResult = [
      { key: "amount", message: "amount is required" },
    ];
    const result = Validator.validate(widthrawSchema, {});
    expect(result).toStrictEqual(expectedResult);
  });
});
