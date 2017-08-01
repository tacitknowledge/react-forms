import React from 'react';
import PropTypes from 'prop-types';
import { ERROR_MSG_CLASS_NAME } from './formConstants';

export default function FormError({ forInput, msg, className }) {
  if (!msg.replace(/\s+/g, '')) {
    return null;
  }

  return (
    <span role="alert" className={`${ERROR_MSG_CLASS_NAME} ${ERROR_MSG_CLASS_NAME}--${forInput} ${className || ''}`}>
      {msg}
    </span>
  );
}

FormError.displayName = 'FormError';
FormError.defaultProps = {
  msg: '',
  className: ''
};
FormError.propTypes = {
  forInput: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};
