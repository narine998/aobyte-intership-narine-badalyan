import { SHOW_HIDE_LOGIN } from "../../constants/redux";

export const loginDialogReducer = (state = {}, action) => {
  if (action.type === SHOW_HIDE_LOGIN) {
    return {
      open: action.payload.open,
    };
  }
  return state;
};

export const initialLoginDialog = {
  open: false,
};

export const editLoginDialogState = (isOpen) => {
  return {
    type: SHOW_HIDE_LOGIN,
    payload: {
      open: isOpen,
    },
  };
};

export const selectLoginOpen = (state) => {
  return state.loginDialog.open;
};
