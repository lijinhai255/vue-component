import { UserState } from './module/user';
import { AppState } from './module/app';
import { Settings } from './module/settings';
import { NoticeState } from './module/notice';
import { MenuState } from './module/menu';
import { TransAssistantState } from './module/transAssistant';
export interface IStoreState {
  app: AppState;
  user: UserState;
  settings: Settings;
  notices: NoticeState;
  menu: MenuState;
  transReducer: TransAssistantState;
}

export interface IAction<T> {
  type: string;
  payload: T;
}
