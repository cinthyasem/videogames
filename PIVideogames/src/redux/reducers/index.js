import { combineReducers } from 'redux';
import gamesReducer from './gamesSlice';

const rootReducer = combineReducers({
  games: gamesReducer,
});

export default rootReducer;