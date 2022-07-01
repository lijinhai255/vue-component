import { Reducer } from 'redux';
import { IAction } from '../types';
import { getToken, setToken, removeToken } from '../../utils/cookie';
import LocalStore from '../../utils/store';

export interface UserState {
  token: string;
  avatar: string | undefined;
  account: string;
  mobile: string;
  role: number;
  id: number;
  orgName?: string;
  orgId?: string;
  orgType?: string;
}

const USER_KEY = 'Admin-user';

const localUser = LocalStore.getValue<UserState>(USER_KEY) || {};

const defaultUser: UserState = {
  token: getToken(),
  avatar: undefined,
  account: '',
  mobile: '',
  role: 0,
  id: 0,
  ...localUser,
};

const SET_USER_INFO = 'SET_USER_INFO';

const SET_USER_LOGOUT = 'SET_USER_LOGOUT';

export const setUserInfo: (user: UserState) => IAction<UserState> = (
  user: UserState,
) => ({
  type: SET_USER_INFO,
  payload: user,
});

export const logout: () => IAction<null> = () => ({
  type: SET_USER_LOGOUT,
  payload: null,
});

const userReducer: Reducer<UserState, IAction<any>> = (
  state = defaultUser,
  action: IAction<any>,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { type, payload } = action;
  console.log(type, 'userReducer=userReducer');
  console.log(payload, 'payload');
  switch (type) {
    case SET_USER_INFO:
      LocalStore.setValue(USER_KEY, payload);
      setToken(payload.token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...payload,
      };
    case SET_USER_LOGOUT:
      removeToken();
      LocalStore.removeValue(USER_KEY);
      return {
        ...defaultUser,
      };
    default:
      return state;
  }
};

export default userReducer;
