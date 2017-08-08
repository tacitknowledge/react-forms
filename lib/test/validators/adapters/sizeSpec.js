'use strict';var _validate=require('validate.js'),_validate2=_interopRequireDefault(_validate);require('../../../main/validators/adapters/size');function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}describe('Validator Adapter - size',function(){var a;beforeEach(function(){a={size:{size:[2,5],message:'^Please enter a valid address'}}}),it('SHOULD return error message WHEN value is LESS THAN minimum characters',function(){var b=_validate2.default.single('1',a);expect(b).toBeDefined(),expect(b).toBeArrayOfStrings(),expect(b).toContain('Please enter a valid address')}),it('SHOULD return error message WHEN value is MORE THAN maximum characters',function(){var b=_validate2.default.single('123456',a);expect(b).toBeDefined(),expect(b).toBeArrayOfStrings(),expect(b).toContain('Please enter a valid address')}),it('SHOULD return undefined WHEN value is WITHIN size constraint',function(){var b=_validate2.default.single('1234',a);expect(b).toBeUndefined()})});