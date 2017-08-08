'use strict';var _react=require('react'),_react2=_interopRequireDefault(_react),_testUtils=require('react-dom/test-utils'),_testUtils2=_interopRequireDefault(_testUtils),_reactRedux=require('react-redux'),_redux=require('redux'),_reduxThunk=require('redux-thunk'),_reduxThunk2=_interopRequireDefault(_reduxThunk),_enzyme=require('enzyme'),_form=require('../../main/forms/form'),_form2=_interopRequireDefault(_form),_formConstants=require('../../main/forms/formConstants'),CONST=_interopRequireWildcard(_formConstants),_formError=require('../../main/forms/formError'),_formError2=_interopRequireDefault(_formError);function _interopRequireWildcard(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b.default=a,b}function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}describe('Form Container',function(){describe('A decorator component which clones all its children and decorates each form element\n    with event handlers, values, error messages, input refs and CSS classes.\n    See "formBuilder.js" for the actual function',function(){var a,b,c={"gx-pin":'1234'},d=function(a){return _react2.default.createElement(_reactRedux.Provider,{store:a},_react2.default.createElement(_form2.default,{handleValidForm:function handleValidForm(){return!0},action:'/',formName:'Giftcard',validation:b,className:'extra-class',defaultValues:c},'This is a string for the form which should not cause build form to break',_react2.default.createElement('div',null,_react2.default.createElement('span',{id:'gx-numberLabelSpan',"data-form-error":'gx-number'},'Some random string'),_react2.default.createElement('label',{id:'gx-numberLabel',htmlFor:'gx-number'},'Giftcard Number'),_react2.default.createElement('input',{name:'gx-number',id:'gx-number',type:'text'}),_react2.default.createElement(_formError2.default,{forInput:'gx-number'}),_react2.default.createElement('span',{id:'gx-pinLabelSpan',"data-form-error":'gx-pin'},'Some random string'),_react2.default.createElement('label',{id:'gx-pinLabel',htmlFor:'gx-pin'},'Giftcard Pin'),_react2.default.createElement('input',{name:'gx-pin',id:'gx-pin',type:'text'}),_react2.default.createElement(_formError2.default,{forInput:'gx-pin'}),_react2.default.createElement('div',{id:'nestedDiv'},'nested string')),_react2.default.createElement('button',null)))};beforeEach(function(){b={rules:{"gx-number":{required:!0},"gx-pin":{required:!0,minlength:4}},messages:{"gx-number":{required:'Please enter a valid giftcard number'},"gx-pin":{required:'Please enter a valid giftcard pin',minlength:'It has to be 4 characters long'}}}}),beforeEach(function(){var b=(0,_redux.createStore)(function(){return{Forms:{}}});a=(0,_enzyme.mount)(d(b))}),afterEach(function(){a.unmount()}),it('SHOULD render component children',function(){expect(a.find('div').length).toBeGreaterThan(0)}),it('SHOULD render string children',function(){expect(a.find('form').text()).toStartWith('This is a string')}),it('SHOULD render nested string children',function(){expect(a.find('#nestedDiv').text()).toStartWith('nested')}),it('SHOULD render nested component children',function(){expect(a.find('input').length).toBeGreaterThan(0)}),it('SHOULD assign extra properties to the Form element',function(){expect(a.find('form').hasClass('extra-class')).toBe(!0)}),describe('Event handler',function(){var b='error message',c=function(){return{Forms:{Giftcard:{errors:{"gx-number":[b]}}}}};beforeEach(function(){var b=(0,_redux.createStore)(c,(0,_redux.applyMiddleware)(_reduxThunk2.default));a=(0,_enzyme.mount)(d(b)),a.find('form').simulate('submit')}),describe('On Submit',function(){describe('This event is triggered when the form is submitted by the user',function(){describe('WHEN error is present',function(){it('SHOULD add error label class',function(){expect(a.find('#gx-numberLabel').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(!0)}),it('SHOULD add error label to custom element',function(){expect(a.find('#gx-numberLabelSpan').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(!0)}),it('SHOULD add error input class',function(){expect(a.find('#gx-number').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(!0)}),it('SHOULD show error message',function(){expect(a.find('FormError').first().prop('msg')).toBe(b)})})})})}),describe('Event handler',function(){var b=function(){return{Forms:{Giftcard:{values:{"gx-number":'some value',"gx-pin":'1234'},errors:{"gx-number":''}}}}};beforeEach(function(){var c=(0,_redux.createStore)(b,(0,_redux.applyMiddleware)(_reduxThunk2.default));a=(0,_enzyme.mount)(d(c)),a.find('form').simulate('submit')}),describe('On Submit',function(){describe('This event is triggered when the form is submitted by the user',function(){describe('WHEN error is present',function(){describe('AND error is removed',function(){it('SHOULD remove error input class',function(){expect(a.find('#gx-number').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(!1)}),it('SHOULD remove error message',function(){expect(a.find('FormError').first().prop('msg')).toBe('')})})})})})}),describe('Event handler',function(){var b='error message',c=function(){return{Forms:{Giftcard:{errors:{"gx-pin":[b]}}}}};beforeEach(function(){var b=(0,_redux.createStore)(c,(0,_redux.applyMiddleware)(_reduxThunk2.default));a=(0,_enzyme.mount)(d(b))}),describe('On Validate',function(){describe('This event is triggered ON BLUR',function(){describe('WHEN error is present',function(){it('SHOULD add error label class',function(){expect(a.find('#gx-pinLabel').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(!0)}),it('SHOULD add error label to custom element',function(){expect(a.find('#gx-pinLabelSpan').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(!0)}),it('SHOULD add error input class',function(){expect(a.find('#gx-pin').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(!0)}),it('SHOULD show error message',function(){expect(a.find('FormError').last().prop('msg')).toBe(b)})})})})}),describe('Event handler',function(){var b=function(){return{Forms:{Giftcard:{}}}};beforeEach(function(){var c=(0,_redux.createStore)(b,(0,_redux.applyMiddleware)(_reduxThunk2.default));a=(0,_enzyme.mount)(d(c))}),describe('On Validate',function(){describe('This event is triggered ON BLUR',function(){describe('WHEN error is present',function(){describe('WHEN value is changed',function(){it('SHOULD trigger validation',function(){a.find('#gx-pin').node.value='asfas',_testUtils2.default.Simulate.change(a.find('#gx-pin').node),_testUtils2.default.Simulate.blur(a.find('#gx-pin').node)})})})})})})})});