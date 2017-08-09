import validate from 'validate.js';
import '../../../lib/validators/adapters/size';

describe('Validator Adapter - size', () => {
  let constraints;

  beforeEach(() => {
    constraints = {
      size: {
        size: [2, 5],
        message: '^Please enter a valid address'
      }
    };
  });

  it('SHOULD return error message WHEN value is LESS THAN minimum characters', () => {
    const hasErrorMsg = validate.single('1', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('Please enter a valid address');
  });

  it('SHOULD return error message WHEN value is MORE THAN maximum characters', () => {
    const hasErrorMsg = validate.single('123456', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('Please enter a valid address');
  });

  it('SHOULD return undefined WHEN value is WITHIN size constraint', () => {
    const hasErrorMsg = validate.single('1234', constraints);
    expect(hasErrorMsg).toBeUndefined();
  });
});
