export const authLogin = username => ({
  type: 'AUTH_LOGIN',
  isAuth: true,
  username
});

export const authLogout = () => ({
  type: 'AUTH_LOGOUT',
  isAuth: false
});
