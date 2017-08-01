import validate from 'validate.js';
import { isEmpty } from 'lodash';

validate.validators.validCard = (value, options) => {
  if (isEmpty(value)) {
    return undefined;
  }

  return true
    ? undefined : options.message;
};
