import { NotificationsEvents } from "@mantine/notifications";

export interface InitialState {
  loading: boolean;
  drawer: boolean;
  isServerRunning: boolean;
  serverOutput: string[];
  conversations: ConversationProps[];
  activeConversation: ConversationProps;
  dispatch: (_: string, _: any) => void;
  toggleTheme: () => void;
  toggleDrawer: () => void;
  toggleLoading: (_: boolean) => void;
  setIsServerRunning: (_: boolean) => void;
  getConversations: () => void;
  handleServerOutput: (_: string | []) => void;
  setActiveConversation: (_:ConversationProps) => void
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

export interface ConversationProps {
  id: string;
  name: string;
  aiRole: string;
  messageHistory: MessageProps[];
}
