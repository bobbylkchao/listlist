import { combineReducers } from 'redux';
import { imageViewModal_Reducer } from './reducers/imageViewModal_Reducer';
import { network_Reducer } from './reducers/network_Reducer';
import { newsCategory_Reducer } from './reducers/newsCategory_Reducer';

export const reducers = combineReducers({
  imageViewModal_Reducer,
  network_Reducer,
  newsCategory_Reducer,
});