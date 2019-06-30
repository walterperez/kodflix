import { createStore, compose, applyMiddleware } from 'redux';
import rootReducers from './frontend/reducers';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const initialState = {};
const store = createStore(
  rootReducers,
  initialState,
  compose(applyMiddleware(...middlewares))
);

export default store;
