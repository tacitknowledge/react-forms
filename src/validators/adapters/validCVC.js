import validate from 'validate.js';
import { isEmpty } from 'lodash';

validate.validators.validCVC = (value, options, attribute, attributes) => {
  if (isEmpty(value)) {
    return undefined;
  }

  return true
    ? undefined : options.message;
};
