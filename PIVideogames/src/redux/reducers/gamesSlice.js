// reducers/gamesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames(state, action) {
      return action.payload;
    },
  },
});

export const { setGames } = gamesSlice.actions;

export const fetchAllVideogames = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/getAllvideoGames');
    dispatch(setGames(response.data));
  } catch (error) {
    console.error('Error fetching videogames:', error);
  }
};

export default gamesSlice.reducer;