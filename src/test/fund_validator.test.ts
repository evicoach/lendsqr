import Joi from "joi";
import { describe, expect, it } from "vitest";
import { Validator } from "../util/validator";

describe("Validate fund inputs to the service", () => {
  it("should return amount and accountId is required", () => {
    // given
    const fundSchema = Joi.object({
      amount: Joi.number().required(),
      accountId: Joi.number().required(),
    });

    // expected result
    const expectedResult = [
      { key: "amount", message: "amount is required" },
      { key: "accountId", message: "accountId is required" },
    ];
      const result = Validator.validate(fundSchema, {});
      expect(result).toStrictEqual(expectedResult);
  });
    
      it("should return amount is required", () => {
        // given
        const fundSchema = Joi.object({
          amount: Joi.number().required(),
          accountId: Joi.number().required(),
        });

        // expected result
        const expectedResult = [
          { key: "accountId", message: "accountId is required" },
        ];
          const result = Validator.validate(fundSchema, {
            amount: 4
        });
        expect(result).toStrictEqual(expectedResult);
      });
});
