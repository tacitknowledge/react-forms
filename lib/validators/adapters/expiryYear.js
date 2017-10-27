import validate from 'validate.js';
import { format, addYears, subYears, isWithinRange, getYear } from 'date-fns';
import { isEmpty } from 'lodash';

validate.validators.expiryYear = (value, options) => {
  if (isEmpty(value)) {
    return undefined;
  }

  const plusNineYears = 9;
  const minuseOneYear = 1;

  return isWithinRange(
    getYear(new Date(format(value, 'YYYY'))),
    getYear(subYears(new Date(), minuseOneYear)),
    getYear(addYears(new Date(), plusNineYears))
  ) ? undefined : options.message;
};

export default validate.validators.expiryYear;
