import Client from './api';

// export const GetUserInfo = async () => {
//   const token = localStorage.token;
//   const res = await Client.get('/api/users/me', {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }).then(() => {

//   });
// };

export const LogInUser = async (data) => {
  try {
    const res = await Client.post('/api/token/', data);
    // Set the current signed in users token to localstorage
    // localStorage.setItem('token', res.data.token);
    localStorage.setItem('token', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);
    // localStorage.setItem('id', res.data.id);
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
    const token = localStorage.getItem('token');
    if (token) {
      const res = await Client.get('/api/users/me');
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
