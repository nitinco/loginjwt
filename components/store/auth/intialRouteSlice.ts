import {createSlice} from '@reduxjs/toolkit';

interface InitialRouteState {
  value: string; // Type for the initial route value
}

const initialState: InitialRouteState = {
  value: 'Splash', // Initial route
};

const initialRouteSlice = createSlice({
  name: 'initialRoute',
  initialState,
  reducers: {
    setInitialRoute: (state, action: {payload: string}) => {
      state.value = action.payload;
    },
  },
});

export const {setInitialRoute} = initialRouteSlice.actions;
export default initialRouteSlice.reducer;
