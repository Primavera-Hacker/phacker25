import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import { useIntl } from "react-intl";
import SobreMenu from "./SobreMenu";
import { LogoPHacker25 } from "../Logos";
import { useLocalizedNavigate } from "../../hooks/useLocalizedNavigate";

import { paths } from "../Router/routes";
import css from "./Navbar.module.css";
import { useState } from "react";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { useLocale } from "../../hooks/useLocale";

const Nav = () => {
  const navigate = useLocalizedNavigate();
  const location = useLocation();
  const intl = useIntl();
  const { locale } = useLocale();

  // Detectar si estamos en home considerando el idioma
  const isHome = location.pathname === "/" || location.pathname === "/en";
  const [menuOpen, setMenuOpen] = useState();

  const evento = intl.formatMessage({ id: "evento" });
  const convocatoria = intl.formatMessage({ id: "convocatoria" });
  const manifiesto = intl.formatMessage({ id: "manifiesto" });
  const cerrar = intl.formatMessage({ id: "cerrar" });

  // Helper para crear paths localizados
  const getLocalizedPath = (path) => {
    return locale === "en" ? `/en${path}` : path;
  };

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
            to={getLocalizedPath(paths.evento)}
            className={cn("text-link-primary px4XS", css.primaryLink)}
          >
            {evento}
          </Link>
          <div
            className={cn(css.rect, "bgGrey300 bgPinkLines")}
            style={{ flex: 6 }}
          />
          <Link
            to={getLocalizedPath(paths.convocatoria)}
            className={cn("text-link-primary px4XS", css.primaryLink)}
          >
            {convocatoria}
          </Link>
          <div className={cn(css.rect, "bgRed")} style={{ flex: 2 }} />
          <Link
            to={getLocalizedPath(paths.manifiesto)}
            className={cn("text-link-primary px4XS", css.primaryLink)}
          >
            {manifiesto}
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
            {menuOpen ? cerrar : "MENU"}
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
