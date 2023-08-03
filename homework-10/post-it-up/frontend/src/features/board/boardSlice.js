import { LEFTBOARD, RATE, RIGHTBOARD } from "../../constants";
import {
  ADD_BOARD_POST,
  CLEAR_BOARD,
  DELETE_BOARD_POST,
  SET_BOARD_POSTS,
  SORT_BOARD,
} from "../../constants/redux";
import { sortObjectsByKey } from "../../helpers";

export const boardPostsReducer = (state = {}, { type, payload }) => {
  if (type === SET_BOARD_POSTS) {
    const ratedPosts = payload.board.filter((post) => post.rate);

    return {
      ...state,
      board: sortObjectsByKey(ratedPosts, RATE),
    };
  }

  if (type === ADD_BOARD_POST) {
    const postsLength = state.board.length;
    if (postsLength) {
      let addedPost, direction, board;
      if (payload.order === "ascending") {
        direction = true;
        addedPost = state.board[0];
        board = state.board.slice(1);
      } else {
        direction = false;
        addedPost = state.board[postsLength - 1];
        board = state.board.slice(0, -1);
      }

      return {
        ...state,
        board,
        [payload.place]: sortObjectsByKey(
          [...state[payload.place], addedPost],
          RATE,
          direction
        ),
      };
    }
  }

  if (type === CLEAR_BOARD) {
    const board = sortObjectsByKey(
      [...state[payload.place], ...state.board],
      RATE,
      true
    );

    return {
      ...state,
      board,
      [payload.place]: [],
    };
  }

  if (type === SORT_BOARD) {
    const sortOrder = payload.order === "ascending" ? true : false;

    return {
      ...state,
      [payload.place]: sortObjectsByKey(state[payload.place], RATE, sortOrder),
    };
  }

  if (type === DELETE_BOARD_POST) {
    const newBoard = sortObjectsByKey(
      [
        ...state.board,
        state[payload.place].find((item) => item.id === payload.id),
      ],
      RATE,
      true
    );

    return {
      ...state,
      board: newBoard,
      [payload.place]: state[payload.place].filter(
        (item) => item.id !== payload.id
      ),
    };
  }

  return state;
};

export const initialBoardPosts = {
  board: [],
  [LEFTBOARD]: [],
  [RIGHTBOARD]: [],
};

//selector
export const getBoardPosts = (state) => state.boardPosts;

//action creators
export const addBoardPost = (place, order) => {
  return {
    type: ADD_BOARD_POST,
    payload: {
      order,
      place,
    },
  };
};

export const clearBoard = (place) => {
  return {
    type: CLEAR_BOARD,
    payload: { place },
  };
};

export const setBoardPosts = (posts) => {
  return {
    type: SET_BOARD_POSTS,
    payload: {
      board: posts,
      [LEFTBOARD]: [],
      [RIGHTBOARD]: [],
    },
  };
};

export const sortBoard = (place, order) => {
  return {
    type: SORT_BOARD,
    payload: {
      place,
      order,
    },
  };
};

export const deleteBoardPost = (place, id) => {
  return {
    type: DELETE_BOARD_POST,
    payload: {
      id,
      place,
    },
  };
};
