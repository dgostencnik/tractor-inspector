import { z } from "zod";

export function requiredNumber(fieldName: string, min: number, max: number = Number.POSITIVE_INFINITY) {
  return z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined)
        return undefined;

      const num = Number(val);
      return Number.isNaN(num) ? val : num;
    },
    z.number({
      invalid_type_error: `${fieldName} must be a number`,
      required_error: `${fieldName} is required`,
    }).min(min, `${fieldName} must be >= ${min}`)
      .max(max, `${fieldName} must be <= ${max}`),
  );
}

export function requiredInt(fieldName: string, min: number, max: number) {
  return z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined)
        return undefined;

      const num = Number(val);
      return Number.isNaN(num) ? val : num;
    },
    z.number({
      invalid_type_error: `${fieldName} must be a number`,
      required_error: `${fieldName} is required`,
    }).int(`${fieldName} must be an integer`)
      .min(min, `${fieldName} must be >= ${min}`)
      .max(max, `${fieldName} must be <= ${max}`),
  );
}

export function optionalNumber(
  fieldName: string,
  options: { min?: number; max?: number; isInt?: boolean } = {},
) {
  const { min, max, isInt } = options;

  return z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) {
        return null;
      }

      const num = Number(val);
      return Number.isNaN(num) ? undefined : num;
    },
    z.union([
      z.null(),
      (() => {
        let schema = z.number({
          invalid_type_error: `${fieldName} must be a number`,
        });

        if (isInt)
          schema = schema.int(`${fieldName} must be an integer`);
        if (min !== undefined)
          schema = schema.min(min, `${fieldName} must be > ${min}`);
        if (max !== undefined)
          schema = schema.max(max, `${fieldName} must be < ${max}`);

        return schema;
      })(),
    ]),
  );
}
