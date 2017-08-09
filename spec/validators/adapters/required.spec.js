import validate from 'validate.js';
import '../../../lib/validators/adapters/required';

describe('Validator Adapter - required', () => {
  let constraints;
  let constraintsFalse;

  beforeEach(() => {
    constraints = {
      required: {
        required: true,
        message: '^This is a required field'
      }
    };
    constraintsFalse = {
      required: {
        required: false,
        message: '^This is a required field'
      }
    };
  });

  it('SHOULD return error message WHEN value is empty', () => {
    const hasErrorMsg = validate.single('', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('This is a required field');
  });

  it('SHOULD return error message WHEN value is whitespace', () => {
    const hasErrorMsg = validate.single('       ', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('This is a required field');
  });

  it('SHOULD return undefined WHEN value is present', () => {
    const hasErrorMsg = validate.single('Kane', constraints);
    expect(hasErrorMsg).toBeUndefined();
  });

  it('SHOULD NOT return error message WHEN value is empty', () => {
    const hasErrorMsg = validate.single('', constraintsFalse);
    expect(hasErrorMsg).toBeUndefined();
  });

  it('SHOULD NOT return error message WHEN value is whitespace', () => {
    const hasErrorMsg = validate.single('       ', constraintsFalse);
    expect(hasErrorMsg).toBeUndefined();
  });
});
