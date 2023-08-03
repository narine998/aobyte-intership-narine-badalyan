import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import {
  initialLoginDialog,
  loginDialogReducer,
} from "../features/loginDialog/loginDialogSlice";
import { initialPool, poolReducer } from "../features/pool/poolSlice";
import { initialSearch, searchReducer } from "../features/search/searchSlice";
import {
  boardPostsReducer,
  initialBoardPosts,
} from "../features/board/boardSlice";

export const store = createStore(
  combineReducers({
    loginDialog: loginDialogReducer,
    poolData: poolReducer,
    search: searchReducer,
    boardPosts: boardPostsReducer,
  }),
  {
    loginDialog: initialLoginDialog,
    poolData: initialPool,
    search: initialSearch,
    boardPosts: initialBoardPosts,
  },
  applyMiddleware(thunk)
);
