import validate from 'validate.js';
import { isEmpty } from 'lodash';

validate.validators.expiryMonth = (value, options) => {
  if (isEmpty(value)) {
    return undefined;
  }

  return parseInt(value, 10) > 0
    && parseInt(value, 10) <= 12 // eslint-disable-line
      ? undefined
      : options.message;
};
