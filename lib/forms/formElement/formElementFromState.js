import { getFormInputType } from './formElementUtils';

export class FormElementFromState {
  constructor(element, values = {}) {
    const {
      name,
      value,
      type
    } = element.props;

    this.name = name;
    this.value = value;
    this.stateValues = values;
    this.type = getFormInputType(type);
  }

  getKeyVal() {
    return this[this.type]();
  }

  checkbox() {
    return this.stateValues.hasOwnProperty(this.name) ? { checked: this.stateValues[this.name] } : null;
  }

  radio() {
    return this.stateValues.hasOwnProperty(this.name) ? { checked: this.stateValues[this.name] === this.value } : null;
  }

  default() {
    return { value: this.stateValues[this.name] || '' };
  }
}

export default function formElementFromState(...args) {
  return new FormElementFromState(...args);
}
