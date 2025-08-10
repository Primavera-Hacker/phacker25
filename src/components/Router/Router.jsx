import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import { routes } from "./routes";
import Meta from "../Meta";

const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          index={route.index}
          element={
            <>
              <Meta {...route.meta} />
              {route.component}
            </>
          }
        />
      ))}
    </Route>
  </Routes>
);

export default Router;
