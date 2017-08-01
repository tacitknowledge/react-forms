import validate from 'validate.js';
import moment from 'moment';
import { isEmpty } from 'lodash';

validate.validators.validDate = (value, options) => {
  if (isEmpty(value)) {
    return undefined;
  }

  return moment(value, options.validDate.format).isValid()
    && moment(value, options.validDate.format).isSameOrAfter(moment(options.validDate.minDate, options.validDate.format))
    && moment(value, options.validDate.format).isSameOrBefore(moment(options.validDate.maxDate, options.validDate.format))
    ? undefined : options.message;
};
