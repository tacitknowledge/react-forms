import validate from 'validate.js';
import Payment from 'payment';
import { isEmpty } from 'lodash';

validate.validators.validCVC = (value, options, attribute, attributes) => {
  if (isEmpty(value)) {
    return undefined;
  }

  return Payment.fns.validateCardCVC(value, attributes.cardType)
    ? undefined : options.message;
};
