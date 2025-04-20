import { ResponseError } from "./response-error.js";
const isEmptyBody = (req) => {
    if (!req.body) {
        throw new ResponseError(400, "Input is required");
    }
};
export default isEmptyBody;
