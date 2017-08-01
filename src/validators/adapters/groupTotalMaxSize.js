import validate from 'validate.js';
import { isEmpty } from 'lodash';

validate.validators.groupTotalMaxSize = (value, options, attribute, attributes) => {
  const length = options.groupTotalMaxSize.items.reduce((acc, item) => {
    const itemValue = validate.getDeepObjectValue(attributes, item);
    return (!isEmpty(itemValue) ? itemValue.length : 0) + acc;
  }, (!isEmpty(value) ? value.length : 0));

  return length > options.groupTotalMaxSize.totalLength ? options.message : undefined;
};
