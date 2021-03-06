import validate from 'validate.js';
import Payment from 'payment';
import { isEmpty } from 'lodash';

validate.validators.expiryDate = (value, options, attribute, attributes) => {
  if (isEmpty(value)) {
    return undefined;
  }

  const {
    expiryYear,
    expiryMonth
  } = attributes;

  const isTwoDigitsMonth = expiryMonth.length > 0; // eslint-disable-line
  const isFourDigitsYear = expiryYear.length === 4; // eslint-disable-line
  const hasExpiryFilled = !isEmpty(expiryYear)
    && !isEmpty(expiryMonth)
    && isFourDigitsYear
    && isTwoDigitsMonth;

  if (hasExpiryFilled) {
    const isValid = Payment.fns.validateCardExpiry(expiryMonth, expiryYear);
    return isValid ? undefined : options.message;
  }

  return undefined;
};
