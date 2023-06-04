import { NotificationsEvents } from "@mantine/notifications";

export interface InitialState {
  loading: boolean;
  drawer: boolean;
  isServerRunning: boolean;
  serverOutput: string[];
  dispatch: (_t: string, _p: any) => void;
  toggleTheme: () => void;
  toggleDrawer: () => void;
  toggleLoading: (val: boolean) => void;
  setIsServerRunning: (val: boolean) => void;
  handleServerOutput: (_val: string | []) => void;
}

export type Dispatch = (type: string, payload: any) => void;

export interface ActionProps {
  payload: any;
  type: string;
}


export interface UserThemeLocalStorage {
  key: string;
  defaultValue: UserTheme;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Function ? T[P] : DeepPartial<T[P]>;
};

export interface MessageProps {
  role: string;
  content: string;
}