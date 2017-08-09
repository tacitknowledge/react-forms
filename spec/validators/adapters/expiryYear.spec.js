import validate from 'validate.js';
import '../../../lib/validators/adapters/expiryYear';

describe('Validator Adapter - expiryYear', () => {
  let constraints;

  beforeEach(() => {
    constraints = {
      expiryYear: {
        expiryYear: true,
        message: '^This is an invalid year'
      }
    };
  });

  it('SHOULD not validate WHEN value is empty', () => {
    const hasErrorMsg = validate.single('', constraints);
    expect(hasErrorMsg).toBeUndefined();
  });

  it('SHOULD return error message when expiry year is BEFORE this year', () => {
    const lastYear = (new Date()).getFullYear() - 1;
    const hasErrorMsg = validate.single(lastYear.toString(), constraints);
    expect(hasErrorMsg).toContain('This is an invalid year');
  });

  it('SHOULD return error message when expiry year is AFTER 10 years from THIS year', () => {
    const tenYearsFromNow = (new Date()).getFullYear() + 10;
    const hasErrorMsg = validate.single(tenYearsFromNow.toString(), constraints);
    expect(hasErrorMsg).toContain('This is an invalid year');
  });

  it('SHOULD NOT return error message when expiry year is WITHIN 10 years from THIS year', () => {
    const thisYear = (new Date()).getFullYear();
    const nextYear = (new Date()).getFullYear() + 1;
    const fiveYearsFromNow = (new Date()).getFullYear() + 4;

    const hasErrorMsg1 = validate.single(thisYear.toString(), constraints);
    const hasErrorMsg2 = validate.single(nextYear.toString(), constraints);
    const hasErrorMsg3 = validate.single(fiveYearsFromNow.toString(), constraints);

    expect(hasErrorMsg1).not.toContain('This is an invalid year');
    expect(hasErrorMsg2).not.toContain('This is an invalid year');
    expect(hasErrorMsg3).not.toContain('This is an invalid year');
  });
});
