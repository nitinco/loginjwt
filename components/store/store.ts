// import {configureStore} from '@reduxjs/toolkit';
// import authReducer from './auth/authSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

import {combineReducers, createStore} from 'redux';
import userReducer from './auth/userReducer';

const rootReducer = combineReducers({
  authData: userReducer,
});

export const store = createStore(rootReducer);
