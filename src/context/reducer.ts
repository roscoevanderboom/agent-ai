import { ActionProps, InitialState } from "@/interfaces";

const reducer = (state: InitialState, action: ActionProps) => {
  const { type, payload } = action;
  switch (type) {
    case reducer_types.SET_DRAWER:
      return { ...state, drawer: payload };
    case reducer_types.SET_LOADING:
      return { ...state, loading: payload };
    case reducer_types.SET_SERVER_OUTPUT:
      return { ...state, serverOutput: payload };
    case reducer_types.SET_IS_SERVER_RUNNING:
      return { ...state, isServerRunning: payload };
    case reducer_types.SET_CONVERSATIONS:
      return { ...state, conversations: payload };
    case reducer_types.SET_ACTIVE_CONVERSATION:
      return { ...state, activeConversation: payload };
    default:
      return state;
  }
};

export default reducer;

export const reducer_types = {
  SET_DRAWER: "SET_DRAWER",
  SET_LOADING: "SET_LOADING",
  SET_IS_SERVER_RUNNING: "SET_IS_SERVER_RUNNING",
  SET_SERVER_OUTPUT: "SET_SERVER_OUTPUT",
  SET_CONVERSATIONS: "SET_CONVERSATIONS",
  SET_ACTIVE_CONVERSATION: "SET_ACTIVE_CONVERSATION",
};
