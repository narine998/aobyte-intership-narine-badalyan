import { SET_SEARCH_TYPE, SET_SEARCH_VALUE } from "../../constants/redux";

export const searchReducer = (state = {}, action) => {
  if (action.type === SET_SEARCH_TYPE) {
    return {
      ...state,
      type: action.payload.type,
    };
  }
  if (action.type === SET_SEARCH_VALUE) {
    return {
      ...state,
      value: action.payload.value,
    };
  }
  return state;
};

export const initialSearch = {
  value: "",
  type: "title",
};

export const selectSearchValue = (state) => state.search.value;
export const selectSearchType = (state) => state.search.type;

export const setSearchValue = (value) => {
  return {
    type: SET_SEARCH_VALUE,
    payload: {
      value,
    },
  };
};

export const setSearchType = (type) => {
  return {
    type: SET_SEARCH_TYPE,
    payload: {
      type,
    },
  };
};
