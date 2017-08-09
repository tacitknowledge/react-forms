import validate from 'validate.js';
import '../../../lib/validators/adapters/groupTotalMaxSize';

describe('Validator Adapter - groupTotalMaxSize', () => {
  let constraints;

  beforeEach(() => {
    constraints = {
      firstName: {
        groupTotalMaxSize: {
          groupTotalMaxSize: {
            items: ['lastName'],
            totalLength: 10
          },
          message: '^character limit reached maximum allowed'
        }
      }
    };
  });

  it('SHOULD return error WHEN total length is exceeded', () => {
    const hasErrorMsg = validate({
      lastName: '123456789',
      firstName: '12'
    }, constraints);
    expect(hasErrorMsg.firstName).toContain('character limit reached maximum allowed');
  });

  it('SHOULD NOT return error WHEN total length is NOT exceeded', () => {
    const hasErrorMsg = validate({
      lastName: '123456789',
      firstName: '0'
    }, constraints);
    expect(hasErrorMsg).toBeUndefined();
  });
});
