import FormGroupAsync from '../../main/forms/formGroupAsync';

describe('FormGroupAsync', () => {
  const mockForm = {
    formName: 'addressForm',
    groups: ['personal', 'address']
  };
  describe(
    `Use this if you have multiple form groups
    AND you want to submit the form only WHEN all groups are valid`
  , () => {
    describe('initialise', () => {
      it('SHOULD assign init props correctly', () => {
        const formGroupAsync = new FormGroupAsync(mockForm);
        expect(formGroupAsync.formName).toBe(mockForm.formName);
        expect(formGroupAsync.groups).toBeArrayOfStrings();
      });

      it(`SHOULD init all the necessary public methods
        (resolve, reject, getName, getNames, each, success, fail)
        `, () => {
        const formGroupAsync = new FormGroupAsync(mockForm);
        expect(formGroupAsync.resolve).toBeFunction();
        expect(formGroupAsync.reject).toBeFunction();
        expect(formGroupAsync.getName).toBeFunction();
        expect(formGroupAsync.getNames).toBeFunction();
      });

      it('SHOULD generate all the resolve callbacks with the correct names', () => {
        const formGroupAsync = new FormGroupAsync(mockForm);
        expect(formGroupAsync.resolvers)
          .toHaveMember(`${mockForm.formName}-${mockForm.groups[0]}`);
        expect(formGroupAsync.resolvers)
          .toHaveMember(`${mockForm.formName}-${mockForm.groups[1]}`);
      });

      it('SHOULD generate all the reject callbacks with the correct names', () => {
        const formGroupAsync = new FormGroupAsync(mockForm);
        expect(formGroupAsync.rejecters)
          .toHaveMember(`${mockForm.formName}-${mockForm.groups[0]}`);
        expect(formGroupAsync.rejecters)
          .toHaveMember(`${mockForm.formName}-${mockForm.groups[1]}`);
      });

      it('SHOULD generate a memo for resolved promises', () => {
        const formGroupAsync = new FormGroupAsync(mockForm);
        expect(formGroupAsync.resolvedMemo).toBeEmptyObject();
      });
    });

    describe('Utility methods', () => {
      describe('getName - returns the name-spaced group name', () => {
        it('SHOULD return the "form name" + "group name" as a concatenated string', () => {
          const formGroupAsync = new FormGroupAsync(mockForm);
          expect(formGroupAsync.getName(mockForm.groups[0]))
            .toBe(`${mockForm.formName}-${mockForm.groups[0]}`);
        });

        it('SHOULD throw an error if group name is not found', () => {
          const formGroupAsync = new FormGroupAsync(mockForm);
          expect(formGroupAsync.getName.bind(formGroupAsync, 'dummyGroup')).toThrowError();
        });
      });

      describe('getNames - returns an array of name-spaced group names', () => {
        it('SHOULD return an array of group name ("form name" + "group name")', () => {
          const formGroupAsync = new FormGroupAsync(mockForm);
          expect(formGroupAsync.getNames()).toBeArrayOfStrings();
        });
      });

      describe('each - iterates through each group and executes the given callback method', () => {
        it('SHOULD execute the given callback method', () => {
          const formGroupAsync = new FormGroupAsync(mockForm);
          const spyObj = { fn: n => n };
          spyOn(spyObj, 'fn');
          formGroupAsync.each(spyObj.fn);
          expect(spyObj.fn).toHaveBeenCalled();
        });
      });
    });

    describe('Handling promises', () => {
      it('SHOULD create an empty array to contain success/fail callback methods', () => {
        const resolvedAsync = new FormGroupAsync({
          formName: 'addressForm',
          groups: ['personal', 'address']
        });

        expect(resolvedAsync.successCallbacks).toBeEmptyArray();
        expect(resolvedAsync.failCallbacks).toBeEmptyArray();
      });

      describe('WHEN a group is resolved', () => {
        it('SHOULD store the resolved data in a memo', () => {
          const mockPersonalDetails = { firstName: 'John' };
          const resolvedAsync = new FormGroupAsync({
            formName: 'addressForm',
            groups: ['personal', 'address']
          });
          const groupName = resolvedAsync.getName(mockForm.groups[0]);

          resolvedAsync.resolve(
            mockPersonalDetails,
            groupName
          );

          expect(resolvedAsync.resolvedMemo[groupName]).toBeObject();
        });

        describe('AND resolved again', () => {
          it('SHOULD store the latest resolved data in the memo', () => {
            const resolvedAsync = new FormGroupAsync({
              formName: 'addressForm',
              groups: ['personal', 'address']
            });
            const groupName = resolvedAsync.getName(mockForm.groups[0]);

            // since we cannot call the done method after a private promise is resolved
            // assume the promise is resolved
            resolvedAsync.resolvers[groupName] = undefined;
            resolvedAsync.resolve(
              { firstName: 'Ben' },
              groupName
            );
            expect(resolvedAsync.resolvedMemo[groupName].firstName).toBe('Ben');
          });
        });

        describe('AND rejected', () => {
          it('SHOULD remove the resolved data from the memo', () => {
            const resolvedAsync = new FormGroupAsync({
              formName: 'addressForm',
              groups: ['personal', 'address']
            });
            const groupName = resolvedAsync.getName(mockForm.groups[0]);

            // since we cannot call the done method after a private promise is resolved
            // assume the promise is resolved
            resolvedAsync.rejecters[groupName] = undefined;
            resolvedAsync.reject(
              ['error msg'],
              groupName
            );
            expect(resolvedAsync.resolvedMemo[groupName]).toBeNull();
          });
        });

        describe('AND all groups are resolved', () => {
          it('SHOULD call success method with correct data', done => {
            const mockPersonalDetails = { firstName: 'John' };
            const mockDeliveryDetails = { line1: '123 Downing St.' };
            const resolvedAsync = new FormGroupAsync({
              formName: 'addressForm',
              groups: ['personal', 'address']
            });

            resolvedAsync.resolve(
              mockPersonalDetails,
              resolvedAsync.getName(mockForm.groups[0])
            );
            resolvedAsync.resolve(
              mockDeliveryDetails,
              resolvedAsync.getName(mockForm.groups[1])
            );

            resolvedAsync.then(formData => {
              expect(formData.firstName).toBe(mockPersonalDetails.firstName);
              expect(formData.line1).toBe(mockDeliveryDetails.line1);
              done();
            }).fail(err => done.fail(`Error handler is called WHEN not intended | ${err}`));
          });
        });

        describe('AND another group is rejected', () => {
          let resolvedAsync;
          let resolvedGroup;
          beforeEach(() => {
            const mockPersonalDetails = { firstName: 'John' };
            resolvedAsync = new FormGroupAsync({
              formName: 'addressForm',
              groups: ['personal', 'address']
            });
            const groupName = resolvedAsync.getName(mockForm.groups[1]);
            resolvedAsync.rejecters[groupName] = (err) => null;

            resolvedGroup = resolvedAsync.getName(mockForm.groups[0]);
            resolvedAsync.resolve(
              mockPersonalDetails,
              resolvedGroup
            );
            resolvedAsync.reject(
              ['error msg'],
              resolvedAsync.getName(mockForm.groups[1])
            ).fail(() => null);
          });

          it('SHOULD remember the resolved promise', () => {
            // since we cannot call the done method after catch
            // assume the above beforeEach happened and the last THEN statement
            // is executed
            resolvedAsync.generatePromises();

            expect(resolvedAsync.resolvedMemo[resolvedGroup]).toHaveMember('firstName');
          });
        });
      });

      describe('WHEN a group is rejected', () => {
        it('SHOULD remove the group from the resolved memo', done => {
          const rejectedAsync = new FormGroupAsync({
            formName: 'addressForm',
            groups: ['personal', 'address']
          });
          const groupName = rejectedAsync.getName(mockForm.groups[0]);

          rejectedAsync.reject(
            ['error message'],
            groupName
          );

          rejectedAsync.fail(err => {
            expect(err).toBeArrayOfStrings();
            expect(rejectedAsync.resolvedMemo[groupName]).toBeNull();
            done();
          });
        });

        it('SHOULD call error method', done => {
          const rejectedAsync = new FormGroupAsync({
            formName: 'addressForm',
            groups: ['personal', 'address']
          });

          rejectedAsync.reject(
            ['error message'],
            rejectedAsync.getName(mockForm.groups[0])
          );

          rejectedAsync
            .then(() => {
              done.fail('Success handler is called WHEN not intended!');
            })
            .fail(err => {
              expect(err).toBeArrayOfStrings();
              done();
            });
        });
      });
    });
  });
});
