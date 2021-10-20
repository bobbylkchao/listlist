import { combineReducers } from 'redux';
import { categoryList } from './reducers/categoryList';
import { categorySelected } from './reducers/categorySelected';
import { userGeo } from './reducers/userGeo';
import { userAuth } from './reducers/userAuth';
import { theme } from './reducers/theme';

export const reducers = combineReducers({
  categoryList,
  categorySelected,
  userGeo,
  userAuth,
  theme,
});
