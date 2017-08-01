import validate from 'validate.js';
import { isEmpty } from 'lodash';

validate.validators.equalTo = (value, options, attribute, attributes) => {
  const valTo = validate.getDeepObjectValue(attributes, options.equalTo);
  return (!isEmpty(value) || !isEmpty(valTo))
          ? validate.validators.equality(value, {
            attribute: options.equalTo.replace(/\[name=|\]|"|'/g, ''),
            message: options.message
          }, attribute, attributes)
          : undefined;
};

