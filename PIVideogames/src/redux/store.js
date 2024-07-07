import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Esto es un ejemplo; ajusta según la estructura de tu proyecto

const store = configureStore({
  reducer: rootReducer,
});

export default store;