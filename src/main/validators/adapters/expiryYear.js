import validate from 'validate.js';
import moment from 'moment';
import { isEmpty } from 'lodash';

validate.validators.expiryYear = (value, options) => {
  if (isEmpty(value)) {
    return undefined;
  }

  const plusNineYears = 9;
  const minuseOneYear = -1;
  return moment(value, 'YYYY').isBetween(
      moment().add(minuseOneYear, 'years'), moment().add(plusNineYears, 'years')
    ) ? undefined : options.message;
};

export default validate.validators.expiryYear;
