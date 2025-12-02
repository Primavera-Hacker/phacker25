import { Link } from "react-router-dom";

import { paths } from "../Router/routes";

import css from "./Navbar.module.css";

const MobileNav = () => {
  return (
    <nav className={css.mobileNav}>
      <Link to={paths.evento}>evento</Link>
      <Link to={paths.programa}>programa</Link>
      <Link to={paths.manifiesto}>manifiesto</Link>
      <a href="https://inscripcion.phacker.org/">Inscripción</a>
    </nav>
  );
};

export default MobileNav;
