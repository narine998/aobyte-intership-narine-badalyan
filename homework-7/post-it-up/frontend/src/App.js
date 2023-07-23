import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import PostPage from "./pages/PostPage";

import { HOME_PATH, SIGNUP_PATH, SINGLEPOST_PATH } from "./constants";

import "./App.css";

const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <Home />,
    // children: [{ path: "/post/:postId", element: <PostPage /> }],
  },
  { path: SINGLEPOST_PATH, element: <PostPage /> },
  {
    path: SIGNUP_PATH,
    element: <SignUpPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
