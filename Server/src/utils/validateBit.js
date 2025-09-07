// Helper to validate bit fields
const validateBit = (value, fieldName) => {
    if (value !== 0 && value !== 1 && value !== true && value !== false) {
        throw new Error(`Invalid argument: ${fieldName} must be 0 or 1 (bit)`);
    }
    return value;
};

export default validateBit;