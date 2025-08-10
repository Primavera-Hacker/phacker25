import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

import css from "./Layout.module.css";

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <main className={css.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
