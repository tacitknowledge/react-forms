import Form from './form';
import FormGroup from './formGroup';
import FormGroupAsync from './formGroupAsync';
import FormError from './formError';
import FormReducer from './formReducer';
import * as FormActions from './formActions';
import * as FormConstants from './formConstants';
import validateExpiryYear from '../validators/adapters/expiryYear';

const forms={
  Form,
  FormGroup,
  FormGroupAsync,
  FormError,
  FormReducer,
  FormActions,
  FormConstants,
  validateExpiryYear
};

export default forms;
window.forms = forms;