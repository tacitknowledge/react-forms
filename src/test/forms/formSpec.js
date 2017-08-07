import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {
  Provider
} from 'react-redux';
import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {
  mount
} from 'enzyme';
import ConnectedForm from '../../main/forms/form';
import * as CONST from '../../main/forms/formConstants';
import FormError from '../../main/forms/formError';

describe('Form Container', () => {
  describe(
    `A decorator component which clones all its children and decorates each form element
    with event handlers, values, error messages, input refs and CSS classes.
    See "formBuilder.js" for the actual function`, () => {
      let wrapper;
      let validationObj;
      const defaultValues = {
        'gx-pin': '1234'
      };

      const getForm = (store) => (
      <Provider store={store}>
        <ConnectedForm
          handleValidForm={() => true}
          action="/"
          formName="Giftcard"
          validation={validationObj}
          className="extra-class"
          defaultValues={defaultValues}
        >
          This is a string for the form which should not cause build form to break
          <div>
            <span id="gx-numberLabelSpan" data-form-error="gx-number">Some random string</span>
            <label id="gx-numberLabel" htmlFor="gx-number">Giftcard Number</label>
            <input name="gx-number" id="gx-number" type="text" />
            <FormError forInput="gx-number" />
            <span id="gx-pinLabelSpan" data-form-error="gx-pin">Some random string</span>
            <label id="gx-pinLabel" htmlFor="gx-pin">Giftcard Pin</label>
            <input name="gx-pin" id="gx-pin" type="text" />
            <FormError forInput="gx-pin" />
            <div id="nestedDiv">nested string</div>
          </div>
          <button />
        </ConnectedForm>
      </Provider>
    );

      beforeEach(() => {
        validationObj = {
          rules: {
            'gx-number': {
              required: true
            },
            'gx-pin': {
              required: true,
              minlength: 4
            }
          },
          messages: {
            'gx-number': {
              required: 'Please enter a valid giftcard number'
            },
            'gx-pin': {
              required: 'Please enter a valid giftcard pin',
              minlength: 'It has to be 4 characters long'
            }
          }
        };
      });

      beforeEach(() => {
        const store = createStore(() => ({
          Forms: {}
        }));
        wrapper = mount(getForm(store));
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it('SHOULD render component children', () => {
        expect(wrapper.find('div').length).toBeGreaterThan(0);
      });

      it('SHOULD render string children', () => {
        expect(wrapper.find('form').text()).toStartWith('This is a string');
      });

      it('SHOULD render nested string children', () => {
        expect(wrapper.find('#nestedDiv').text()).toStartWith('nested');
      });

      it('SHOULD render nested component children', () => {
        expect(wrapper.find('input').length).toBeGreaterThan(0);
      });

      it('SHOULD assign extra properties to the Form element', () => {
        expect(wrapper.find('form').hasClass('extra-class')).toBe(true);
      });

      describe('Event handler', () => {
        const errorMsg = 'error message';
        const mockReducer = () => ({
          Forms: {
            Giftcard: {
              errors: {
                'gx-number': [errorMsg]
              }
            }
          }
        });
        beforeEach(() => {
          const store = createStore(mockReducer, applyMiddleware(thunk));
          wrapper = mount(getForm(store));
          wrapper.find('form').simulate('submit');
        });
        describe('On Submit', () => {
          describe('This event is triggered when the form is submitted by the user', () => {
            describe('WHEN error is present', () => {

              it('SHOULD add error label class', () => {
                expect(wrapper.find('#gx-numberLabel').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
              });

              it('SHOULD add error label to custom element', () => {
                expect(wrapper.find('#gx-numberLabelSpan').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
              });

              it('SHOULD add error input class', () => {
                expect(wrapper.find('#gx-number').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
              });

              it('SHOULD show error message', () => {
                expect(wrapper.find('FormError').first().prop('msg')).toBe(errorMsg);
              });
            });
          });
        });
      });
      describe('Event handler', () => {
        const errorMsg = 'error message';
        const mockReducer = () => ({
          Forms: {
            Giftcard: {
              values: {
                'gx-number': 'some value',
                'gx-pin': '1234'
              },
              errors: {
                'gx-number': ''
              }
            }
          }
        });
        beforeEach(() => {
          const store = createStore(mockReducer, applyMiddleware(thunk));
          wrapper = mount(getForm(store));
          wrapper.find('form').simulate('submit');
        });
        describe('On Submit', () => {
          describe('This event is triggered when the form is submitted by the user', () => {
            describe('WHEN error is present', () => {

              describe('AND error is removed', () => {

                it('SHOULD remove error input class', () => {
                  expect(wrapper.find('#gx-number')
                    .hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(false);
                });
                it('SHOULD remove error message', () => {
                  expect(wrapper.find('FormError').first().prop('msg')).toBe('');
                });
              });
            });
          });
        });
      });
      describe('Event handler', () => {
        const errorMsg = 'error message';
        const mockReducer = () => ({
          Forms: {
            Giftcard: {
              errors: {
                'gx-pin': [errorMsg]
              }
            }
          }
        });
        beforeEach(() => {
          const store = createStore(mockReducer, applyMiddleware(thunk));
          wrapper = mount(getForm(store));
        });

        describe('On Validate', () => {
          describe('This event is triggered ON BLUR', () => {
            describe('WHEN error is present', () => {

              it('SHOULD add error label class', () => {
                expect(wrapper.find('#gx-pinLabel').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
              });

              it('SHOULD add error label to custom element', () => {
                expect(wrapper.find('#gx-pinLabelSpan').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
              });

              it('SHOULD add error input class', () => {
                expect(wrapper.find('#gx-pin').hasClass(CONST.ERROR_INPUT_CLASS_NAME)).toBe(true);
              });

              it('SHOULD show error message', () => {
                expect(wrapper.find('FormError').last().prop('msg')).toBe(errorMsg);
              });
            });
          });
        });
      });
      describe('Event handler', () => {
        const errorMsg = 'error message';
        const mockReducer = () => ({
          Forms: {
            Giftcard: {}
          }
        });
        beforeEach(() => {
          const store = createStore(mockReducer, applyMiddleware(thunk));
          wrapper = mount(getForm(store));
        });

        describe('On Validate', () => {
          describe('This event is triggered ON BLUR', () => {
            describe('WHEN error is present', () => {
              describe('WHEN value is changed', () => {

                it('SHOULD trigger validation', () => {
                  // smoke test no expect needed
                  wrapper.find('#gx-pin').node.value = 'asfas';
                  ReactTestUtils.Simulate.change(wrapper.find('#gx-pin').node);
                  ReactTestUtils.Simulate.blur(wrapper.find('#gx-pin').node);
                });
              });
            });
          });
        });
      });
    });
});