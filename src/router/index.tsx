import { lazy, LazyExoticComponent, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Auth from "../components/auth/Auth";
import NewPost from "../pages/newPost/NewPost";
import People from "../pages/people/People";
import Profile from "../pages/profile/Profile";
import SignUp from "../pages/sign-up/SignUp";
import Login from "../pages/login/Login";
const Home: LazyExoticComponent<any> = lazy(() => import("../pages/home/Home"));
const Layout: LazyExoticComponent<any> = lazy(
  () => import("../pages/layout/Layout")
);

const Routers = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <Auth>
          <Suspense>
            <Layout />
          </Suspense>
        </Auth>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/new-post",
          element: (
            <Suspense>
              <NewPost />
            </Suspense>
          ),
        },
        {
          path: "/people",
          element: (
            <Suspense>
              <People />
            </Suspense>
          ),
        },
        {
          path: "/profile/:id",
          element: (
            <Suspense>
              <Profile />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <Suspense>
          <h2>404</h2>
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <Suspense>
          <SignUp />
        </Suspense>
      ),
    },
  ]);
};

export default Routers;
