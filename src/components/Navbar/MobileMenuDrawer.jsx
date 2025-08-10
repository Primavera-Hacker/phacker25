import cn from "classnames";
import { Link } from "react-router-dom";
import { paths } from "../Router/routes";

import css from "./Navbar.module.css";
import { LogoPrimaveraHacker } from "../Logos";

const MobileMenuDrawer = ({ isOpen, closeDrawer }) => {
  if (!isOpen) return null;
  return (
    <div className={css.drawer}>
      <div className={css.drawerMenu}>
        <LogoPrimaveraHacker />
        <Link
          onClick={closeDrawer}
          to={paths.evento}
          className={cn("text-link-primary", css.primaryLink)}
        >
          evento
        </Link>
        <Link
          onClick={closeDrawer}
          to={paths.convocatoria}
          className={cn("text-link-primary", css.primaryLink)}
        >
          convocatoria
        </Link>
        <Link
          onClick={closeDrawer}
          to={paths.manifiesto}
          className={cn("text-link-primary", css.primaryLink)}
        >
          manifiesto
        </Link>
        <Link
          onClick={closeDrawer}
          to={paths.conducta}
          className={cn("text-link-primary", css.primaryLink)}
        >
          codigo de conducta
        </Link>
      </div>
      <div className={css.lang}>
        <button className={cn("text-link-primary", css.primaryLink)}>
          ESP
        </button>
        <button className={cn("text-link-primary", css.primaryLink)}>EN</button>
      </div>
    </div>
  );
};

export default MobileMenuDrawer;
