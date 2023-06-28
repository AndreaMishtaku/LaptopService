import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, clientRoutes, freeAccessRoutes } from "./routes-list";
import React, { Suspense } from "react";
import Page404 from "../pages/Page404";
import Page401 from "../pages/Page401";
import Loader from "../components/loader";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import SimpleLayout from "../layouts/simple/SimpleLayout";
import useGetUser from "../hooks/useGetUser";
import { IRoute } from "../assets/interfaces";

const App = () => {
  const user = useGetUser();

  const renderRoutes = (routes: Array<IRoute>) => {
    return routes.map((r: any, index: number) => {
      return (
        <Route
          key={index}
          element={
            React.isValidElement(r.element)
              ? r.element
              : React.createElement(r.element)
          }
          path={r.path}
        >
          {r.children && r.children.length > 0 && renderRoutes(r.children)}
        </Route>
      );
    });
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path={"/admin"}
            element={
              user ? <DashboardLayout /> : <Navigate to="/login" replace />
            }
          >
            {renderRoutes(adminRoutes)}
          </Route>

          <Route
            path={"/client"}
            element={
              user ? <DashboardLayout /> : <Navigate to="/login" replace />
            }
          >
            {renderRoutes(clientRoutes)}
          </Route>
          <Route
            path="/"
            element={
              !user ? (
                <SimpleLayout />
              ) : (
                <Navigate
                  to={`/${user.role.toLowerCase()}/dashboard`}
                  replace
                />
              )
            }
          >
            {renderRoutes(freeAccessRoutes)}
          </Route>
          <Route path="/401" element={<Page401 />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
