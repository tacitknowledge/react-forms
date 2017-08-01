import validate from 'validate.js';
import { isEmpty } from 'lodash';

validate.validators.pattern = (value, options, attribute, attributes) => (
  (!isEmpty(value))
    ? validate.validators.format(value, {
      pattern: options.pattern,
      message: options.message,
      flags: 'i'
    }, attribute, attributes)
    : undefined
);
