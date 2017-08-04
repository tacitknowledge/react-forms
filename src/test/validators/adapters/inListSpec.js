import validate from 'validate.js';
import '../../../main/validators/adapters/inList';

describe('Validator Adapter - inList', () => {
  let constraints;

  beforeEach(() => {
    constraints = {
      inList: {
        inList: [1, 2, 3, 4],
        message: '^Not in list'
      }
    };
  });

  it('SHOULD return error message WHEN value is NOT in List', () => {
    const hasErrorMsg = validate.single('12345', constraints);
    expect(hasErrorMsg).toBeDefined();
    expect(hasErrorMsg).toBeArrayOfStrings();
    expect(hasErrorMsg).toContain('Not in list');
  });

  it('SHOULD return undefined WHEN value is found in List', () => {
    const hasErrorMsg = validate.single(1, constraints);
    expect(hasErrorMsg).toBeUndefined();
  });
});
