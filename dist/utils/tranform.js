import { error } from "console";
import { ResponseError } from "./response-error.js";
export const stringToNumber = (field, fieldName) => {
    try {
        if (Number.isNaN(field))
            throw error;
        const numberValue = Number.parseInt(field);
        return numberValue;
    }
    catch (error) {
        throw new ResponseError(400, `${fieldName} must be a valid number, received "${field}"`, fieldName);
    }
};
