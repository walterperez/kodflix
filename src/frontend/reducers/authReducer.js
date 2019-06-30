import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ADMIN_LOGIN,
  AUTH_ADMIN_LOGOUT
} from '../actions/types';

const initialState = {
  isLogged: false,
  isAdmin: false
};

export default function authReducers(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        isLogged: true
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isLogged: false
      };
    case AUTH_ADMIN_LOGIN:
      return {
        ...state,
        isAdmin: true
      };
    case AUTH_ADMIN_LOGOUT:
      return {
        ...state,
        isAdmin: false
      };
    default:
      return state;
  }
}
