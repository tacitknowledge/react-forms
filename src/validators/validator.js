/*
  TODO need to reopen discussion about the shared validation interface.
  Ideally, we want to change the BE interface slightly
  so we would not need to use an adapter between
  the server side JSON interface and validate.js.
  https://confluence.tacitknowledge.com/pages/viewpage.action?pageId=65963616
*/
import validate from 'validate.js';
import './adapters/required';
import './adapters/minlength';
import './adapters/maxlength';
import './adapters/size';
import './adapters/pattern';
import './adapters/equalTo';
import './adapters/inList';
import './adapters/range';
import './adapters/validDate';
import './adapters/validCard';
import './adapters/expiryDate';
import './adapters/expiryMonth';
import './adapters/expiryYear';
import './adapters/validCVC';
import './adapters/email';
import './adapters/groupTotalMaxSize';

function escapeDotObjectKeys(key) {
  return key.replace(/\./g, '\\\\.');
}

function getMessage(msg) {
  if (typeof msg === 'function') {
    return msg;
  }

  return `^${msg}`;
}

function transformToObject(prev, current) {
  return Object.assign(prev, current);
}

function adaptRuleAndMsg(valRulesAndMsg, key) {
  return Object.keys(valRulesAndMsg.rules[key])
              .map((rule) => ({
                [rule]: {
                  [rule]: valRulesAndMsg.rules[key][rule],
                  message: getMessage(valRulesAndMsg.messages[key][rule])
                }
              }))
              .reduce(transformToObject, {});
}

function adaptConstraints(valRulesAndMsg) {
  return Object.keys(valRulesAndMsg.rules)
              .map((key) => ({ [escapeDotObjectKeys(key)]: adaptRuleAndMsg(valRulesAndMsg, key) }))
              .reduce(transformToObject, {});
}

function unescapeDotObjectKeys(errorObj) {
  if (!errorObj) {
    return null;
  }

  return Object.keys(errorObj)
          .map((key) => ({ [key.replace(/\\\\./g, '.')]: errorObj[key] }))
          .reduce(transformToObject, {});
}

export default class Validate {
  constructor(valRulesAndMsg) {
    this.setConstraints(valRulesAndMsg);
  }

  setConstraints(valRulesAndMsg) {
    this.constraints = adaptConstraints(valRulesAndMsg);
  }

  validate(formData, constraints = this.constraints) {
    return unescapeDotObjectKeys(validate(formData, constraints)) || '';
  }

  single(key, formData, constraints = this.constraints) {
    const errorMsgs = validate(formData, { [escapeDotObjectKeys(key)]: constraints[escapeDotObjectKeys(key)] }) || {};
    return errorMsgs[escapeDotObjectKeys(key)] || '';
  }
}
