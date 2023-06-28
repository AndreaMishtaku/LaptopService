import { IRoute } from "../assets/interfaces";
import { lazy } from "react";

const adminRoutes: Array<IRoute> = [
  {
    path: "/admin/dashboard",
    element: lazy(() => import("../pages/admin/dashboard")),
  },
  {
    path: "/admin/laptops",
    element: lazy(() => import("../pages/admin/laptops")),
  },
  {
    path: "/admin/tickets",
    element: lazy(() => import("../pages/admin/tickets")),
  },
  {
    path: "/admin/laptop-parts",
    element: lazy(() => import("../pages/admin/laptop-parts")),
  },
];

const clientRoutes: Array<IRoute> = [
  {
    path: "/client/dashboard",
    element: lazy(() => import("../pages/client/dashboard")),
  },
  {
    path: "/client/laptops",
    element: lazy(() => import("../pages/client/laptops")),
  },
  {
    path: "/client/tickets",
    element: lazy(() => import("../pages/client/tickets")),
  },
];

const freeAccessRoutes: Array<IRoute> = [
  {
    path: "/login",
    element: lazy(() => import("../pages/main/login")),
  },
  {
    path: "/register",
    element: lazy(() => import("../pages/main/register")),
  },
  {
    path: "/",
    element: lazy(() => import("../pages/main")),
  },
];

export { adminRoutes, clientRoutes, freeAccessRoutes };
