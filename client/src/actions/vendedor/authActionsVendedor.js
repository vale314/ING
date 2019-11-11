import axios from "axios";
import setAuthToken from '../../utils/setAuthTokenVendedor';

import {
  VENDEDOR_REGISTER_SUCCESS,
  VENDEDOR_REGISTER_FAIL,
  VENDEDOR_LOADED,
  VENDEDOR_AUTH_ERROR,
  VENDEDOR_LOGIN_SUCCESS,
  VENDEDOR_LOGIN_FAIL,
  VENDEDOR_LOGOUT,
  VENDEDOR_CLEAR_ERRORS
} from '../types';

// Load User
export const loadUser = () => (dispatch) => {

    if (localStorage.tokenVendedor) {
      setAuthToken(localStorage.tokenVendedor);
    }

    axios.get('/api/vendedor')
    .then( res =>{

      dispatch({
        type: VENDEDOR_LOADED,
        payload: res.data
      });
    })
    .catch(() =>{
      dispatch({ type: VENDEDOR_AUTH_ERROR });
    })

  };

  // Register User
 export const register = formData =>   (dispatch) =>  {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
      axios.post('/api/vendedor/signup', formData, config)

      .then(res => {
        dispatch({
          type: VENDEDOR_REGISTER_SUCCESS,
          payload: res.data
        });
        
      })
      .catch(err => {
        dispatch({
          type: VENDEDOR_REGISTER_FAIL,
          payload: err.response.data.msg
        });
          
      })
  };

  // Login User
export const login = formData => (dispatch) =>  {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

      axios.post('/api/vendedor/login', formData, config)
      .then( res =>{
        dispatch({
          type: VENDEDOR_LOGIN_SUCCESS,
          payload: res.data
        });
  
        loadUser();
      })
      .catch( err =>{
        dispatch({
          type: VENDEDOR_LOGIN_FAIL,
          payload: err.response.data.msg
        });
      })
  };

  // Logout
  export const logout = () => (dispatch) =>  dispatch({ type: VENDEDOR_LOGOUT });

  // Clear Errors
  export const clearErrors = () => (dispatch) =>  dispatch({ type: VENDEDOR_CLEAR_ERRORS });
