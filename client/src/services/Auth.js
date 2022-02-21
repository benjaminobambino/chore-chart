import Client from './api';

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
