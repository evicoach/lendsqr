import Joi, { Schema } from "joi";
export interface ValidationError {
  key: string | number;
  message: string;
}

export class Validator {
  static validate = (schema: Schema, object: Object) => {
    const value: Joi.ValidationResult<any> = schema.validate(object, {
      abortEarly: false,
    });
    if (value && value.error) {
      const errors: Array<ValidationError> = value.error.details.map(
        (detail) => {
          return {
            key: detail.path[0],
            message: detail.message.replace(/['"]/g, ""),
          };
        }
      );
      return errors;
    }
  };
}