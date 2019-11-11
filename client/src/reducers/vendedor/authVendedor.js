import {
    VENDEDOR_REGISTER_SUCCESS,
    VENDEDOR_REGISTER_FAIL,
    VENDEDOR_LOADED,
    VENDEDOR_AUTH_ERROR,
    VENDEDOR_LOGIN_SUCCESS,
    VENDEDOR_LOGIN_FAIL,
    VENDEDOR_LOGOUT,
    VENDEDOR_CLEAR_ERRORS
  } from '../../actions/types';

const initialState = {
    token: localStorage.getItem('tokenVendedor'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case VENDEDOR_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload
        };
      case VENDEDOR_REGISTER_SUCCESS:
      case VENDEDOR_LOGIN_SUCCESS:
        localStorage.setItem('tokenVendedor', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false
        };
      case VENDEDOR_REGISTER_FAIL:
      case VENDEDOR_AUTH_ERROR:
      case VENDEDOR_LOGIN_FAIL:
      case VENDEDOR_LOGOUT:
        localStorage.removeItem('tokenVendedor');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload
        };
      case VENDEDOR_CLEAR_ERRORS:
        return {
          ...state,
          error: null
        };
      default:
        return state;
    }
  };