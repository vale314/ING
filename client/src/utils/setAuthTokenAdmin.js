import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['tokenAdmin'] = token;
    
  } else {
    delete axios.defaults.headers.common['tokenAdmin'];
  }
};

export default setAuthToken;