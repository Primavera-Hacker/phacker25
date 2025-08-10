import { Link, useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import SobreMenu from "./SobreMenu";
import { LogoPHacker25 } from "../Logos";

import { paths } from "../Router/routes";
import css from "./Navbar.module.css";
import { useState } from "react";
import MobileMenuDrawer from "./MobileMenuDrawer";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState();

  return (
    <>
      <header className={css.root}>
        <button className={css.homeButton} onClick={() => navigate(paths.home)}>
          /
        </button>
        <SobreMenu />
        <nav className={css.menuDesktop}>
          <div className={cn(css.rect, "bgGrey700")} style={{ flex: 3 }} />
          {/* <div className={cn(css.rect, "bgRed")} style={{ flex: 6 }} /> */}
          <Link
            to={paths.evento}
            className={cn("text-link-primary px4XS", css.primaryLink)}
          >
            evento
          </Link>
          <div
            className={cn(css.rect, "bgGrey300 bgPinkLines")}
            style={{ flex: 6 }}
          />
          <Link
            to={paths.convocatoria}
            className={cn("text-link-primary px4XS", css.primaryLink)}
          >
            convocatoria
          </Link>
          <div className={cn(css.rect, "bgRed")} style={{ flex: 2 }} />
          <Link
            to={paths.manifiesto}
            className={cn("text-link-primary px4XS", css.primaryLink)}
          >
            manifiesto
          </Link>
          <div className={cn(css.rect, "bgGrey200")} style={{ flex: 4 }} />
          <div
            className={cn(css.rect, "bgGrey700 bgGreenLines")}
            style={{ flex: 3 }}
          />
        </nav>
        <nav className={css.menuMobile}>
          <div className={cn(css.rect, "bgRed")} style={{ flex: 1 }} />
          <div
            className={cn(css.rect, "bgGrey200 bgPinkLines")}
            style={{ flex: 5 }}
          />
          <div
            className={cn(css.rect, "bgGrey900 bgPinkLines")}
            style={{ flex: 3 }}
          />
          {!isHome && (
            <button
              className={css.logoMobile}
              onClick={() => {
                setMenuOpen(false);
                navigate(paths.home);
              }}
            >
              <LogoPHacker25 />
            </button>
          )}
          <button
            onClick={() => setMenuOpen((state) => !state)}
            className={cn("text-link-primary px4XS", css.primaryLink)}
          >
            {menuOpen ? "CERRAR" : "MENU"}
          </button>
        </nav>
      </header>
      <MobileMenuDrawer
        isOpen={menuOpen}
        closeDrawer={() => setMenuOpen(false)}
      />
    </>
  );
};

export default Nav;
