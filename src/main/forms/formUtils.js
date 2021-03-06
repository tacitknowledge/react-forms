import React from 'react';
import { omit, includes, pick } from 'lodash';
import formElementFromReact from './formElement/formElementFromReact';

export function isAReactEl(el = '') {
  return !!(React.Children.toArray(el).filter(child => React.isValidElement(child))[0]);
}

export function isAFormEl({ type }) {
  return includes([
    'input', 'textarea', 'select'
  ], type);
}

export function isAFormGroup({ type }) {
  if (typeof type === 'function' && type.name === 'Connect') {
    return type.WrappedComponent.displayName === 'FormGroup';
  }

  return false;
}

export function getFormElementNames(children) {
  return React.Children.map(children, (element) => {
    if (!isAReactEl(element)) {
      return null;
    }

    if (isAFormEl(element)) {
      return element.props.name;
    }

    if (isAReactEl(element.props.children)) {
      return getFormElementNames(element.props.children);
    }

    return null;
  });
}

export function getFormData(children, refs) {
  return React.Children.map(children, (element) => {
    if (!isAReactEl(element)) {
      return null;
    }

    if (isAFormEl(element)) {
      return formElementFromReact(element, refs).getKeyVal();
    }

    if (isAReactEl(element.props.children)) {
      return getFormData(element.props.children, refs);
    }

    return null;
  }).reduce((prev, current) => Object.assign({}, prev, current), {});
}

export function pickValidation({ rules, messages }, keys) {
  return {
    rules: pick(rules, keys),
    messages: pick(messages, keys)
  };
}

export function omitValidation({ rules, messages }, keys) {
  return {
    rules: omit(rules, keys),
    messages: omit(messages, keys)
  };
}

export function filterValidation({ validation, children }) {
  return pickValidation(validation, getFormElementNames(children));
}

export function replaceNullForEmptyString(values = {}) {
  return (
    Object.keys(values).map(key => ({
      [key]: values[key] || ''
    })).reduce((accumulator, current) => Object.assign(accumulator, current), {})
  );
}
