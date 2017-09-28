import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as FormActions from './formActions';
import FormGroup from './formGroup';

export class Form extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      triggerValidate,
      formName
    } = this.props;

    triggerValidate(formName);
  }

  render() {
    const {
      children,
      className,
      name,
      ...otherProps
    } = this.props;
    return (
      <form onSubmit={this.onSubmit} className={className} noValidate name={name}>
        <FormGroup {...otherProps}>{children}</FormGroup>
      </form>
    );
  }
}

Form.defaultProps = {
  className: ''
};

Form.propTypes = {
  triggerValidate: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
};

export default connect(null, FormActions)(Form);
