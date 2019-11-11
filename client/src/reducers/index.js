import { combineReducers } from 'redux';
import authReducer from './auth';
import alertReducer from './alert';
import adminAuthReducer from './admin/authAdmin';
import vendedorAuthReducer from './vendedor/authVendedor';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  authAdmin: adminAuthReducer,
  authVendedor: vendedorAuthReducer
});