import { combineReducers } from 'redux';
import { categoryList } from './reducers/categoryList';
import { categorySelected } from './reducers/categorySelected';
import { userGeo } from './reducers/userGeo';
import { userAuth } from './reducers/userAuth';

export const reducers = combineReducers({
  categoryList,
  categorySelected,
  userGeo,
  userAuth,
});
