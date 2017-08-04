import validate from 'validate.js';
import { isEmpty } from 'lodash';

validate.validators.size = (value, options) => (
  (!isEmpty(value))
    ? validate.validators.length(value, {
      minimum: options.size[0],
      maximum: options.size[1],
      message: options.message
    })
    : undefined
);
