import validate from 'validate.js';
import { isEmpty } from 'lodash';

validate.validators.minlength = (value, options) => (
  (!isEmpty(value))
    ? validate.validators.length(value, {
      minimum: options.minlength,
      message: options.message
    })
    : undefined
);


validate.validators.minLength = (value, options) => (
  (!isEmpty(value))
    ? validate.validators.length(value, {
      minimum: options.minLength,
      message: options.message
    })
    : undefined
);
