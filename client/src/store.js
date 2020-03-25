import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import boardReducer from "./reducers/boardReducer";
import listReducer from "./reducers/listReducer";
import cardReducer from "./reducers/cardReducer";
import userReducer from "./reducers/userReducer";

const reducers = combineReducers({
  board: boardReducer,
  lists: listReducer,
  cards: cardReducer,
  user: userReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
