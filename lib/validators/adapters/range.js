import validate from 'validate.js';
import { isValid, format, isWithinRange } from 'date-fns';
import { isEmpty } from 'lodash';

validate.validators.range = (value, options) => {
  if (isEmpty(value)) {
    return undefined;
  }

  const backEndDateFormat = 'YYYY-MM-DD';
  const backEndValidationDateFormat = 'YYYY-MM-DD HH:mm:ss';

  return isValid(new Date(format(value, backEndDateFormat))) &&
    isWithinRange(
      new Date(format(value, backEndDateFormat)),
      new Date(format(options.range.from, backEndValidationDateFormat)),
      new Date(format(options.range.to, backEndValidationDateFormat))
    ) ? undefined : options.message;
};
