'use strict';var _validate=require('validate.js'),_validate2=_interopRequireDefault(_validate),_lodash=require('lodash');function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}_validate2.default.validators.pattern=function(a,b,c,d){return(0,_lodash.isEmpty)(a)?void 0:_validate2.default.validators.format(a,{pattern:b.pattern,message:b.message,flags:'i'},c,d)};