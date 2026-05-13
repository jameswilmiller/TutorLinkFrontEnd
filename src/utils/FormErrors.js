/**
 * Converts an array of field errors from the API into a map
 * keyed by field name for easy lookup in forms.
 *
 * Input:  [{ field: "email", message: "Invalid email" }, ...]
 * Output: { email: "Invalid email", ... }
 */
export function toFieldErrorMap(fieldErrors) {
    if (!fieldErrors || fieldErrors.length === 0) {
        return {};
    }
    return fieldErrors.reduce((acc, err) => {
        acc[err.field] = err.message;
        return acc;
    }, {});
}