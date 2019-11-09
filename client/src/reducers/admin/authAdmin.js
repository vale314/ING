import {
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_FAIL,
    ADMIN_LOADED,
    ADMIN_AUTH_ERROR,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGOUT,
    ADMIN_CLEAR_ERRORS
  } from '../../actions/types';

const initialState = {
    token: localStorage.getItem('tokenAdmin'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case ADMIN_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload
        };
      case ADMIN_REGISTER_SUCCESS:
      case ADMIN_LOGIN_SUCCESS:
        localStorage.setItem('tokenAdmin', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false
        };
      case ADMIN_REGISTER_FAIL:
      case ADMIN_AUTH_ERROR:
      case ADMIN_LOGIN_FAIL:
      case ADMIN_LOGOUT:
        localStorage.removeItem('tokenAdmin');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload
        };
      case ADMIN_CLEAR_ERRORS:
        return {
          ...state,
          error: null
        };
      default:
        return state;
    }
  };