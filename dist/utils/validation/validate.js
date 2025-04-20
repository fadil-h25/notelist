const validate = (schema, data) => {
    try {
        const result = schema.parse(data);
        return result;
    }
    catch (error) {
        throw error;
    }
};
export default validate;
