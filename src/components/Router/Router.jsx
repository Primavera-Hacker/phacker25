import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import { paths, routes } from "./routes";
import Meta from "../Meta";

const Router = () => (
  <Routes>
    {routes.map((route) => (
      <Route
        key={route.path}
        element={<Layout noPadding={route.path === paths.home} />}
      >
        <Route
          path={route.path}
          index={route.index}
          element={
            <>
              <Meta {...route.meta} />
              {route.component}
            </>
          }
        />
      </Route>
    ))}
  </Routes>
);

export default Router;
