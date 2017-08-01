import validate from 'validate.js';

validate.validators.required = (value, options, attr, attrs) => (
  (options.required)
    ? validate.validators.presence(value || attrs[attr.replace(/\\\\./g, '.')], {
      presence: options.required,
      message: options.message
    }) : undefined
);
