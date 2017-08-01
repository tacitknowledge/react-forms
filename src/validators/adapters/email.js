import validate from 'validate.js';

const EMAIL_PATTERN = validate.validators.email.PATTERN;

validate.validators.email = (value, options) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  return !EMAIL_PATTERN.exec(value) ? options.message : null;
};
