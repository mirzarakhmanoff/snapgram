import { lazy, LazyExoticComponent, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Auth from "../components/auth/Auth";
import NewPost from "../pages/newPost/NewPost";
import People from "../pages/people/People";
import Profile from "../pages/profile/Profile";
import SignUp from "../pages/sign-up/SignUp";
import Login from "../pages/login/Login";
import Error from "../pages/error/Error";
import SinglePostPage from "../pages/singlePostPage/SinglePostPage";
import Explore from "../pages/explore/Explore";
import Followers from "../components/followers/Followers";
import Following from "../components/following/Following";
import Saved from "../pages/saved/Saved";
import Chats from "../pages/chats/Chats";
import Settings from "../pages/settings/Settings";
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
        {
          path: "/post/:username/:id",
          element: (
            <Suspense>
              <SinglePostPage />
            </Suspense>
          ),
        },
        {
          path: "/explore",
          element: (
            <Suspense>
              <Explore />
            </Suspense>
          ),
        },
        {
          path: "/followers/:username",
          element: (
            <Suspense>
              <Followers />
            </Suspense>
          ),
        },
        {
          path: "/following/:username",
          element: (
            <Suspense>
              <Following />
            </Suspense>
          ),
        },
        {
          path: "/saved",
          element: (
            <Suspense>
              <Saved />
            </Suspense>
          ),
        },
        {
          path: "/chats",
          element: (
            <Suspense>
              <Chats />
            </Suspense>
          ),
        },
        {
          path: "/settings",
          element: (
            <Suspense>
              <Settings />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense>
              <Error />
            </Suspense>
          ),
        },
      ],
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
