import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducer,
  userLoginReducer,
} from "./reducers/userReducers.js";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
});
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
