import validate from 'validate.js';
import { isValid, format, isSameDay, isAfter, isBefore } from 'date-fns';
import { isEmpty } from 'lodash';

validate.validators.validDate = (value, options) => {
  if (isEmpty(value)) {
    return undefined;
  }

  const formatDate = options.validDate.format;
  const minDate = options.validDate.minDate;
  const maxDate = options.validDate.maxDate;

  const dateValue = new Date(format(value, formatDate));
  const dateMin = new Date(format(minDate, formatDate));
  const dateMax = new Date(format(maxDate, formatDate));

  return isValid(dateValue) &&
    (isSameDay(dateValue, dateMin) || isAfter(dateValue, dateMin)) &&
    (isSameDay(dateValue, dateMax) || isBefore(dateValue, dateMax)) ? undefined : options.message;
};
