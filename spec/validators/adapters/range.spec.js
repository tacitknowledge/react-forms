import validate from 'validate.js';
import '../../../lib/validators/adapters/range';

describe('Validator Adapter - range', () => {
  let constraints;

  beforeEach(() => {
    constraints = {
      range: {
        range: ['2013-12-15 12:01:10', '2018-12-15 12:01:10'],
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
    const hasErrorMsg = validate.single('1990-02-21', constraints);
    expect(hasErrorMsg).toContain('This is an invalid date');
  });

  it('SHOULD NOT return error message when date DOES exist AND is within date range', () => {
    const hasErrorMsg1 = validate.single('2014-12-15', constraints);
    const hasErrorMsg2 = validate.single('2013-12-16', constraints);
    const hasErrorMsg3 = validate.single('2018-12-15', constraints);
    expect(hasErrorMsg1).toBeUndefined();
    expect(hasErrorMsg2).toBeUndefined();
    expect(hasErrorMsg3).toBeUndefined();
  });

  it('SHOULD return an error message when date is below minDate', () => {
    const hasErrorMsg = validate.single('1999-1-1', constraints);
    expect(hasErrorMsg).toContain('This is an invalid date');
  });

  it('SHOULD return an error message when date is beyond maxDate', () => {
    const hasErrorMsg = validate.single('2019-12-15', constraints);
    expect(hasErrorMsg).toContain('This is an invalid date');
  });
});
