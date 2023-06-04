import { createMemoryRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./pages/LandingPage";

export const routes = [
  {
    element: <LandingPage />,
    path: "/landing-page",
  },
];

export default createMemoryRouter(
  [
    {
      path: "/",
      element: <App />,
      children: routes,
    },
  ],
  {
    initialEntries: ["/landing-page"],
  }
);
