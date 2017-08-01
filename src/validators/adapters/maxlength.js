import validate from 'validate.js';
import { isEmpty } from 'lodash';

validate.validators.maxlength = (value, options) => (
  (!isEmpty(value))
    ? validate.validators.length(value, {
      maximum: options.maxlength,
      message: options.message
    })
    : undefined
);

validate.validators.maxLength = (value, options) => (
  (!isEmpty(value))
    ? validate.validators.length(value, {
      maximum: options.maxLength,
      message: options.message
    })
    : undefined
);
