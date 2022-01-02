import { createStore, combineReducers, applyMiddleware } from "redux";
import { questionReducer } from "./QuestionStore/questionReducer";
import { userReducer } from "./UserStore/userReducer";
import {
  loadingBarReducer,
  loadingBarMiddleware,
} from "react-redux-loading-bar";

const thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  return next(action);
};

const rootReducer = combineReducers({
  questions: questionReducer,
  users: userReducer,
  loadingBar: loadingBarReducer,
});
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loadingBarMiddleware())
);

export default store;
