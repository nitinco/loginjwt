export type RootStackParamList = {
  Home: undefined; // No params for Home screen
  Details: undefined; // Details screen expects an itemId param
  Splash: undefined; // Splash screen might receive optional userId
  Login: undefined;
  Logout: undefined; // No params for Login screen
  SignUp: undefined;
  Test: undefined; // No params for Test screen (can be customized later)
};
