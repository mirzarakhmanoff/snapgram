import { lazy, LazyExoticComponent } from "react";
import { useRoutes } from "react-router-dom";
import { SuspenseComponent as Suspense } from "../utils";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign-up/SignUp";
import Auth from "../components/auth/Auth";

const Home: LazyExoticComponent<any> = lazy(() => import("../pages/home/Home"));

const Layout: LazyExoticComponent<any> = lazy(
  () => import("../pages/layout/Layout")
);

const Routers = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <Suspense>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Auth>
              <Suspense>
                <Home />
              </Suspense>
            </Auth>
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
