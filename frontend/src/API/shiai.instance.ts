import axios from 'axios';

const shiai = axios.create({
  // baseURL: 'http://localhost:8000/',
  baseURL: 'https://shiai-backend.herokuapp.com/',
});

const getAccess = (): string | undefined => {
  const user = JSON.parse(localStorage.getItem('shiai-user') || '{}');
  return user.access;
};

shiai.interceptors.request.use((config) => {
  const accessToken = getAccess();
  if (accessToken) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${getAccess()}`;
    } else {
      config.headers = { Authorization: `Bearer ${getAccess()}` };
    }
  }
  // custom methods for api authentication
  return config;
});

export default shiai;
