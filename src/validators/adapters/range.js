import validate from 'validate.js';
import moment from 'moment';
import { isEmpty } from 'lodash';

validate.validators.range = (value, options) => {
  if (isEmpty(value)) {
    return undefined;
  }

  const backEndDateFormat = 'YYYY-MM-DD';
  const backEndValidationDateFormat = 'YYYY-MM-DD HH:mm:ss';

  return moment(value, backEndDateFormat).isValid()
    && moment(value, backEndDateFormat).isBetween(
      moment(options.range[0], backEndValidationDateFormat),
      moment(options.range[1], backEndValidationDateFormat),
      null,
      '[]'
    )
    ? undefined : options.message;
};
