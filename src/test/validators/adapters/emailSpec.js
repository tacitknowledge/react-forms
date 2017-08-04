import validate from 'validate.js';
import '../../../main/validators/adapters/email';

describe('Validator Adapter - email', () => {
  let constraints;

  beforeEach(() => {
    constraints = {
      email: {
        email: true,
        message: '^Invalid email address'
      }
    };
  });

  it('SHOULD allow empty values', () => {
    constraints.email = undefined;
    expect(validate.single('', constraints)).not.toBeDefined();
    expect(validate.single(undefined, constraints)).not.toBeDefined();
  });

  it('SHOULD not allow non strings', () => {
    expect(validate.single(3.14, constraints)).toBeDefined();
    expect(validate.single(true, constraints)).toBeDefined();
  });

  it('SHOULD allow valid emails', () => {
    expect(validate.single('nicklas@ansman.se', constraints)).not.toBeDefined();
    expect(validate.single('NiCkLaS@AnSmAn.Se', constraints)).not.toBeDefined();
    // Source: https://en.wikipedia.org/wiki/Email_address#Valid_email_addresses
    expect(validate.single('niceandsimple@example.com', constraints)).not.toBeDefined();
    expect(validate.single('very.common@example.com', constraints)).not.toBeDefined();
    expect(validate.single('a.little.lengthy.but.fine@dept.example.com', constraints)).not.toBeDefined();
    expect(validate.single('disposable.style.email.with+symbol@example.com', constraints)).not.toBeDefined();
    expect(validate.single('other.email-with-dash@example.com', constraints)).not.toBeDefined();
    expect(validate.single('üñîçøðé@example.com', constraints)).not.toBeDefined();
    expect(validate.single('foo@some.customtld', constraints)).not.toBeDefined();
  });

  it('SHOULD NOT allow INVALID emails', () => {
    expect(validate.single(' ', constraints)).toBeDefined();
    expect(validate.single('foobar', constraints)).toBeDefined();
    expect(validate.single('foo@bar', constraints)).toBeDefined();

    // Source: https://en.wikipedia.org/wiki/Email_address#Invalid_email_addresses
    expect(validate.single('abc.example.com', constraints)).toBeDefined();
    expect(validate.single('a@b@c@example.com', constraints)).toBeDefined();
    expect(validate.single('a"b(c)d,e:f;g<h>i[j\\k]l@example.com', constraints)).toBeDefined();
    expect(validate.single('just"not"right@example.com', constraints)).toBeDefined();
    expect(validate.single('this is"not\\allowed@example.com', constraints)).toBeDefined();
    expect(validate.single('this\\ still\\"not\\\\allowed@example.com', constraints)).toBeDefined();
  });

  it('SHOULD return a customized error message', () => {
    expect(validate.single('foobar', constraints)).toContain(constraints.email.message.replace('^', ''));
    constraints.email.message = 'is totally not an email';
    expect(validate.single('foobar', constraints)).toContain(constraints.email.message.replace('^', ''));
  });
});
