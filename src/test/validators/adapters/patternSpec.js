import validate from 'validate.js';
import '../../../main/validators/adapters/pattern';

describe('Validator Adapter - pattern', () => {
  let constraints;

  beforeEach(() => {
    constraints = {
      pattern: {
        pattern: "^[A-Za-z0-9._'%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$|^$", // eslint-disable-line quotes
        message: '^does not match pattern'
      }
    };
  });

  it('SHOULD return error message WHEN pattern does not match', () => {
    const hasErrorMsg = validate.single('123', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('does not match pattern');
  });

  it('SHOULD return undefined WHEN value matches the pattern', () => {
    const hasErrorMsg = validate.single('kb@gmail.com', constraints);
    expect(hasErrorMsg).toBeUndefined();
  });

  it('SHOULD return undefined WHEN value is empty, empty values should be handled by required', () => {
    const hasErrorMsg = validate.single('', constraints);
    expect(hasErrorMsg).toBeUndefined();
  });
});
