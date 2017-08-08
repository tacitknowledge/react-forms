'use strict';var _validate=require('validate.js'),_validate2=_interopRequireDefault(_validate);require('../../../main/validators/adapters/groupTotalMaxSize');function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}describe('Validator Adapter - groupTotalMaxSize',function(){var a;beforeEach(function(){a={firstName:{groupTotalMaxSize:{groupTotalMaxSize:{items:['lastName'],totalLength:10},message:'^character limit reached maximum allowed'}}}}),it('SHOULD return error WHEN total length is exceeded',function(){var b=(0,_validate2.default)({lastName:'123456789',firstName:'12'},a);expect(b.firstName).toContain('character limit reached maximum allowed')}),it('SHOULD NOT return error WHEN total length is NOT exceeded',function(){var b=(0,_validate2.default)({lastName:'123456789',firstName:'0'},a);expect(b).toBeUndefined()})});