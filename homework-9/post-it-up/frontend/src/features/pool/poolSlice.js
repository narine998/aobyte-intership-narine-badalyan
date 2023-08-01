import { fetchPool } from "./poolApi";
import { DISABLE_POOL, SET_POOL } from "../../constants/redux";
import { findAverageRate } from "../../helpers";

const ERROR_MESSAGE = "There aren't any posts yet. Create a new one";

export const poolReducer = (state = {}, action) => {
  if (action.type === SET_POOL) {
    return action.payload;
  }

  if (action.type === DISABLE_POOL) {
    const newPool = [...state.pool];
    const ids = action.payload.ids;
    ids.forEach((id) => {
      const idx = state.pool.findIndex((item) => item.id === id);
      newPool[idx] = {
        ...newPool[idx],
        disabled: !newPool[idx].disabled,
      };
    });

    return { ...state, pool: newPool };
  }

  return state;
};

export const initialPool = {
  pool: [],
  loading: true,
  error: null,
};

export const selectPoolData = (state) => state.poolData;

export const setPool = (posts, errorMessage) => {
  return {
    type: SET_POOL,
    payload: {
      pool: posts,
      loading: false,
      error: errorMessage,
    },
  };
};

export const disablePool = (ids) => {
  return {
    type: DISABLE_POOL,
    payload: {
      ids,
    },
  };
};

export const loadPool = () => {
  return (dispatch, getState) => {
    fetchPool()
      .then((response) => {
        if (response.data) {
          const posts = findAverageRate(response.data);
          dispatch(setPool(posts, null));
        } else {
          dispatch(setPool([], ERROR_MESSAGE));
        }
      })
      .catch((err) => dispatch(setPool([], err.message)));
  };
};
