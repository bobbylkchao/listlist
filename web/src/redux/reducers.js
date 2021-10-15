import { combineReducers } from 'redux';
import { categoryList } from './reducers/categoryList';
import { categorySelected } from './reducers/categorySelected';
import { userGeo } from './reducers/userGeo';

export const reducers = combineReducers({
  categoryList,
  categorySelected,
  userGeo,
});
