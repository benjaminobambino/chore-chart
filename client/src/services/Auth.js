import Client from './api';

export const CheckSession = async () => {
  const refresh = localStorage.getItem('refresh');
  if (refresh) {
    const res = await Client.post('/api/token/refresh/', { refresh });
    localStorage.setItem(res.data.access);
    return res;
  } else {
    return null;
  }
};
