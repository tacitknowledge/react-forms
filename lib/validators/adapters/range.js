import validate from 'validate.js';
import { isValid, format, isWithinRange } from 'date-fns';
import { isEmpty } from 'lodash';

validate.validators.range = (value, options) => {
  if (isEmpty(value)) {
    return undefined;
  }

  const expectedDateFormat = 'YYYY-MM-DD';

  return isValid(new Date(format(value, expectedDateFormat))) &&
    isWithinRange(
      new Date(format(value, expectedDateFormat)),
      new Date(format(options.range.from, expectedDateFormat)),
      new Date(format(options.range.to, expectedDateFormat))
    ) ? undefined : options.message;
};
