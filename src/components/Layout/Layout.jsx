import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

import css from "./Layout.module.css";

const Layout = ({ noPadding }) => {
  return (
    <div className="app">
      <Navbar />
      <main className={css.main} data-full={noPadding}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
