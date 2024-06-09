export const loginAction = () => {
  return {
    type: 'LOGIN',
    payload: true,
  };
};

export const logoutAction = () => {
  return {
    type: 'LOGOUT',
    payload: false,
  };
};

export const updateToken = (token: string) => {
  return {
    type: 'Update',
    payload: token,
  };
};
