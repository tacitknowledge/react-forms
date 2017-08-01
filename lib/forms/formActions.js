'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.setInitialData=setInitialData,exports.setDataReplace=setDataReplace,exports.setDataMerge=setDataMerge,exports.setValidity=setValidity,exports.setSingleValidity=setSingleValidity,exports.setInputValue=setInputValue,exports.reset=reset,exports.triggerValidate=triggerValidate;var _formConstants=require('./formConstants'),CONST=_interopRequireWildcard(_formConstants);function _interopRequireWildcard(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b.default=a,b}function setInitialData(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{};return{type:CONST.FORM_INITIAL_DATA,formName:a,values:b,errors:c}}function setDataReplace(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{};return{type:CONST.FORM_DATA_REPLACE,formName:a,values:b,errors:c}}function setDataMerge(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{};return{type:CONST.FORM_DATA_MERGE,formName:a,values:b,errors:c}}function setValidity(a,b){return{type:CONST.FORM_VALIDATE,errors:b,formName:a}}function setSingleValidity(a,b){return{type:CONST.FORM_SINGLE_VALIDATE,errors:b,formName:a}}function setInputValue(a,b){return{type:CONST.FORM_INPUT_CHANGE,formInput:b,formName:a}}function reset(a){return{type:CONST.FORM_RESET,formName:a}}function triggerValidate(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:!0;return{type:CONST.FORM_TRIGGER_VALIDATION,formName:a,trigger:b}}