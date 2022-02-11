import Client from './api';

export const LogInUser = async (data) => {
  try {
    const res = await Client.post('/api/token/', data);
    // Set the current signed in users token to localstorage
    // localStorage.setItem('token', res.data.token);
    console.log(res.data);
    localStorage.setItem('token', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);
    // localStorage.setItem('id', res.data.id);
    return res.data.user;
  } catch (error) {
    throw error;
  }
};

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/api/user/signup/', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.get('/api/token/refresh');
    return res.data;
  } catch (error) {
    throw error;
  }
};
