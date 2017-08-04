import validate from 'validate.js';
import { isEmpty } from 'lodash';

validate.validators.inList = (value, options) => (
  (!isEmpty(value))
    ? validate.validators.inclusion(value, {
      within: options.inList,
      message: options.message
    })
    : undefined
);
