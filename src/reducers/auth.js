const initialState = {
  isAuth: false,
  username: null
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return {
        isAuth: action.isAuth,
        username: action.username
      };
    case 'AUTH_LOGOUT':
      return {
        isAuth: action.isAuth,
        username: null
      };
    default:
      return state;
  }
};

export default Auth;
