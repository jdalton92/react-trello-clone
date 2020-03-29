import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import navReducer from "./reducers/navReducer";
import boardReducer from "./reducers/boardReducer";
import listReducer from "./reducers/listReducer";
import cardReducer from "./reducers/cardReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducers = combineReducers({
  nav: navReducer,
  board: boardReducer,
  lists: listReducer,
  cards: cardReducer,
  user: userReducer,
  notifications: notificationReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
