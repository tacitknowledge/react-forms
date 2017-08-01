import validate from 'validate.js';
import Payment from 'payment';
import { isEmpty } from 'lodash';

validate.validators.validCard = (value, options) => {
  if (isEmpty(value)) {
    return undefined;
  }

  return Payment.fns.validateCardNumber(value)
    ? undefined : options.message;
};
