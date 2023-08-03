import { fetchPool } from "./poolApi";
import {
  DISABLE_POOL,
  SET_POOL,
  SORT_POST_COMMENTS,
  UPDATE_COMMENT_REPLIES,
  UPDATE_POST_COMMENTS,
} from "../../constants/redux";
import { findAverageRate, sortObjectsByKey } from "../../helpers";
import { setBoardPosts } from "../board/boardSlice";
import { addComment, deleteComment, replyComment } from "../../api/api";

const ERROR_MESSAGE = "There aren't any posts yet. Create a new one";

export const initialPool = {
  pool: [],
  loading: true,
  error: null,
};

export const poolReducer = (state = {}, { type, payload }) => {
  if (type === SET_POOL) {
    return payload;
  }

  if (type === DISABLE_POOL) {
    const newPool = [...state.pool];
    const ids = payload.ids;
    ids.forEach((id) => {
      const idx = state.pool.findIndex((item) => item.id === id);
      newPool[idx] = {
        ...newPool[idx],
        disabled: !newPool[idx].disabled,
      };
    });

    return { ...state, pool: newPool };
  }

  if (type === UPDATE_POST_COMMENTS) {
    const newPool = [...state.pool];
    const index = state.pool.findIndex((post) => post.id === payload.postId);
    newPool[index] = {
      ...newPool[index],
      comments: sortObjectsByKey(payload.comments, "rating", payload.direction),
    };

    return {
      ...state,
      pool: newPool,
    };
  }

  if (type === UPDATE_COMMENT_REPLIES) {
    const newPool = [...state.pool];
    const postIndex = state.pool.findIndex(
      (post) => post.id === payload.postId
    );
    const comments = [...newPool[postIndex].comments];
    const comIndex = comments.findIndex((com) => com.id === payload.commentId);
    comments[comIndex] = { ...comments[comIndex], replies: payload.replies };
    newPool[postIndex].comments[comIndex] = comments[comIndex];
    return {
      ...state,
      pool: newPool,
    };
  }

  if (type === SORT_POST_COMMENTS) {
    const newPool = [...state.pool];
    const postIndex = state.pool.findIndex(
      (post) => post.id === payload.postId
    );
    newPool[postIndex] = {
      ...newPool[postIndex],
      comments: sortObjectsByKey(
        newPool[postIndex].comments,
        "rating",
        payload.direction
      ),
    };

    return {
      ...state,
      pool: newPool,
    };
  }

  return state;
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

export const updatePostComments = (postId, comments, sortDir) => {
  return {
    type: UPDATE_POST_COMMENTS,
    payload: { postId, comments, direction: sortDir },
  };
};

export const sortPostComments = (direction, postId) => {
  return {
    type: SORT_POST_COMMENTS,
    payload: {
      direction,
      postId,
    },
  };
};

export const updatePostCommentReplies = (postId, commentId, replies) => {
  return {
    type: UPDATE_COMMENT_REPLIES,
    payload: { commentId, postId, replies },
  };
};

export const sendNewComment = (postId, commentData, sortDir, rate) => {
  return async (dispatch, getState) => {
    const updatedComments = await addComment(postId, {
      text: commentData,
      rating: rate,
    });
    dispatch(updatePostComments(postId, updatedComments, sortDir));
  };
};

export const deletePostComment = (postId, commentId, sortDir) => {
  return async (dispatch) => {
    const updatedComments = await deleteComment(postId, commentId);
    dispatch(updatePostComments(postId, updatedComments, sortDir));
  };
};

export const replyPostComment = (postId, commentId, replyData) => {
  return async (dispatch) => {
    const replies = await replyComment(postId, commentId, { text: replyData });
    dispatch(updatePostCommentReplies(postId, commentId, replies));
  };
};

export const loadPool = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetchPool();
      if (response.data) {
        const posts = findAverageRate(response.data);
        dispatch(setPool(posts, null));
        dispatch(setBoardPosts(posts));
      } else {
        dispatch(setPool([], ERROR_MESSAGE));
        dispatch(setBoardPosts([]));
      }
    } catch (err) {
      dispatch(setPool([], err.message));
    }
  };
};
