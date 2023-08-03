import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import SignUpPage, { action as authAction } from "./pages/SignUpPage";
import PostPage, { loader as SinglePostLoader } from "./pages/PostPage";

import {
  HOME_PATH,
  SIGNUP_PATH,
  SINGLEPOST_PATH,
  NEWPOST_PATH,
} from "./constants";

import "./App.css";
import PublishPost from "./pages/PublishPost";

const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <Home />,
  },
  { path: SINGLEPOST_PATH, element: <PostPage />, loader: SinglePostLoader },
  {
    path: SIGNUP_PATH,
    element: <SignUpPage />,
    action: authAction,
  },
  {
    path: NEWPOST_PATH,
    element: <PublishPost />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
