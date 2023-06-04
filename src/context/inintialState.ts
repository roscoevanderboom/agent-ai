import { InitialState } from "@/interfaces";

const initialState: InitialState = {
  loading: false,
  drawer: false,
  isServerRunning: false,
  serverOutput: [],
  dispatch: (_t: string, _p: any) => null,
  toggleTheme: () => null,
  toggleDrawer: () => null,
  toggleLoading: (_val: boolean) => null,
  setIsServerRunning: (_val: boolean) => null,
  handleServerOutput: (_val: string | []) => null
};

export default initialState;
