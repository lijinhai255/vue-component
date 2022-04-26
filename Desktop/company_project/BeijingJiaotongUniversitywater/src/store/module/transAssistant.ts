import { Reducer } from 'redux';
import { IAction } from '../types';

export interface TransAssistantState {
  isShow: boolean;
}

const defaultTrans: TransAssistantState = {
  isShow: false,
};

const SET_USER_INFO = 'SET_TRANSASSISTANT';
export const setTrans: (
  user: TransAssistantState,
) => IAction<TransAssistantState> = (user: TransAssistantState) => ({
  type: SET_USER_INFO,
  payload: user,
});

const transReducer: Reducer<TransAssistantState, IAction<any>> = (
  state = defaultTrans,
  action: IAction<any>,
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_INFO:
      return {
        ...payload,
      };
    default:
      return state;
  }
};

export default transReducer;
