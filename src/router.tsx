import { createMemoryRouter } from "react-router-dom";
import App from "./App";
import MainView from "./pages/MainView";
import AvailableModels from "./pages/AvailableModels";
import CreateConversation from "./pages/CreateConversation";

export const routes = [
  {
    element: <MainView />,
    path: "/main-view",
  },
  {
    element: <AvailableModels />,
    path: "/available-models",
  },
  {
    element: <CreateConversation />,
    path: "/create-conversation",
  },
];

export default createMemoryRouter(
  [
    {
      path: "/",
      element: <App />,
      children: routes,
    },
  ]
);
