import Client from './api';

export const LogInUser = async (data) => {
  try {
    const res = await Client.post('/api/token/', data);
    // Set the current signed in users token to localstorage
    // localStorage.setItem('token', res.data.token);
    localStorage.setItem('refresh', res.data.refresh);
    // localStorage.setItem('id', res.data.id);
    localStorage.setItem('token', res.data.access);
    return res.data;
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
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
      const res = await Client.post('/api/token/refresh/', { refresh }).then(
        (res) => {
          localStorage.setItem('token', res.data.access);
        }
      );
      return res;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
