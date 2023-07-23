import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import PostPage from "./pages/PostPage";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // children: [{ path: "/post/:postId", element: <PostPage /> }],
  },
  { path: "/post/:postId", element: <PostPage /> },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
