import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['tokenVendedor'] = token;
    
  } else {
    delete axios.defaults.headers.common['tokenVendedor'];
  }
};

export default setAuthToken;