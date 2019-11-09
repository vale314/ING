import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';

import {
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_LOADED,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_CLEAR_ERRORS
} from '../types';

// Load User
export const loadUser = () => (dispatch) => {

    if (localStorage.tokenAdmin) {
      setAuthToken(localStorage.tokenAdmin);
    }

    axios.get('/api/admin')
    .then( res =>{

      dispatch({
        type: ADMIN_LOADED,
        payload: res.data
      });
    })
    .catch(() =>{
      dispatch({ type: ADMIN_AUTH_ERROR });
    })

  };

  // Register User
 export const register = formData =>   (dispatch) =>  {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
      axios.post('/api/admin/signup', formData, config)

      .then(res => {
        dispatch({
          type: ADMIN_REGISTER_SUCCESS,
          payload: res.data
        });
        
      })
      .catch(err => {
        dispatch({
          type: ADMIN_REGISTER_FAIL,
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

      axios.post('/api/admin/login', formData, config)
      .then( res =>{
        dispatch({
          type: ADMIN_LOGIN_SUCCESS,
          payload: res.data
        });
  
        loadUser();
      })
      .catch( err =>{
        dispatch({
          type: ADMIN_LOGIN_FAIL,
          payload: err.response.data.msg
        });
      })
  };

  // Logout
  export const logout = () => (dispatch) =>  dispatch({ type: ADMIN_LOGOUT });

  // Clear Errors
  export const clearErrors = () => (dispatch) =>  dispatch({ type: ADMIN_CLEAR_ERRORS });
