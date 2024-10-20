import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './reducers/gamesSlice'; 

const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export default store;

//config general del edo global