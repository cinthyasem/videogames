import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './reducers/gamesSlice'; // Esto es un ejemplo; ajusta según la estructura de tu proyecto

const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export default store;