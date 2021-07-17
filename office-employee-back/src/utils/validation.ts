export class ValidationUtils {
  requiredFields(fields: Array<string>, data: object) {
    const missingKeys = [];
    for (let field of fields) {
      if (!data[field]) {
        missingKeys.push(field);
        break;
      }
    }
    return missingKeys;
  }
}
