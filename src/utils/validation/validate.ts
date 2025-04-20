import { ZodSchema } from "zod";

const validate = (schema: ZodSchema, data: any): any => {
  try {
    const result = schema.parse(data);
    return result;
  } catch (error) {
    throw error;
  }
};

export default validate;
