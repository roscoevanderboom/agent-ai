import { ConversationProps, InitialState } from "@/interfaces";

const convo = {
  id: "",
  name: "",
  aiRole: "",
  messageHistory: [],
};

const initialState: InitialState = {
  loading: false,
  drawer: false,
  isServerRunning: false,
  serverOutput: [],
  conversations: [],
  activeConversation: convo,
  dispatch: (_: string, _p: any) => null,
  toggleTheme: () => null,
  toggleDrawer: () => null,
  toggleLoading: (_: boolean) => null,
  setIsServerRunning: (_: boolean) => null,
  getConversations: () => null,
  handleServerOutput: (_: string | []) => null,
  setActiveConversation: (_: ConversationProps) => null,
};

export default initialState;
