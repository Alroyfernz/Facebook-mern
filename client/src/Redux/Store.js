import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./Reducers/userReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
});
// const initialState = {

// };
const middleware = [thunk];
const Store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
