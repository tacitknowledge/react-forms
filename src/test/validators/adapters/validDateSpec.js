import validate from 'validate.js';
import '../../../main/validators/adapters/validDate';

describe('Validator Adapter - validDate', () => {
  let constraints;

  beforeEach(() => {
    constraints = {
      validDate: {
        validDate: {
          format: 'DD-MM-YYYY',
          minDate: '1-1-1900',
          maxDate: '1-1-3000'
        },
        message: '^This is an invalid date'
      }
    };
  });

  it('SHOULD not validate WHEN value is empty', () => {
    const hasErrorMsg = validate.single('', constraints);
    expect(hasErrorMsg).toBeUndefined();
  });

  it('SHOULD return error message when date is not a valid date', () => {
    const hasErrorMsg = validate.single('Kane', constraints);
    expect(hasErrorMsg).toContain('This is an invalid date');
  });

  it('SHOULD return error message when date DOES NOT exist', () => {
    const hasErrorMsg = validate.single('31-02-1999', constraints);
    expect(hasErrorMsg).toContain('This is an invalid date');
  });

  it('SHOULD NOT return error message when date DOES exist', () => {
    const hasErrorMsg1 = validate.single('3-02-1999', constraints);
    const hasErrorMsg2 = validate.single('3-2-1999', constraints);
    const hasErrorMsg3 = validate.single('03-02-1999', constraints);
    expect(hasErrorMsg1).toBeUndefined();
    expect(hasErrorMsg2).toBeUndefined();
    expect(hasErrorMsg3).toBeUndefined();
  });

  it('SHOULD validate the date according to the format given', () => {
    const hasErrorMsg1 = validate.single('3-02-1999', constraints);
    const hasErrorMsg2 = validate.single('3-31-1999', constraints);
    expect(hasErrorMsg1).toBeUndefined();
    expect(hasErrorMsg2).toContain('This is an invalid date');
  });

  it('SHOULD return an error message when date is below minDate', () => {
    const hasErrorMsg = validate.single('1999-1-1', constraints);
    expect(hasErrorMsg).toContain('This is an invalid date');
  });

  it('SHOULD return an error message when date is beyond maxDate', () => {
    const hasErrorMsg = validate.single('1-1-6000', constraints);
    expect(hasErrorMsg).toContain('This is an invalid date');
  });
});
