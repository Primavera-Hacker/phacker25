import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

import { paths } from "../Router/routes";

import css from "./Footer.module.css";
import cn from "classnames";

const Nav = () => {
  return (
    <footer className={css.root}>
      <div className={cn(css.rect, css.redRect, "bgRed")} />
      <div className={cn(css.rect, css.jp, "bgGrey800 bgPinkLines")}>
        <strong>春ハッカー</strong>
      </div>
      <div className={css.links}>
        <Link to={paths.conducta} className={cn(css.link, "text-eyebrow")}>
          CODIGO DE CONDUCTA
        </Link>{" "}
        <a href="#" className={cn(css.link, "text-eyebrow")}>
          ARCHIVO PHACKER
        </a>
      </div>
      <div className={cn(css.info, "bgGrey200 bgGreenLines")}>
        <Marquee autoFill>
          <span style={{ marginLeft: "1rem" }}>
            5 y 6 de Diciembre, Casa Palacio, Santiago, Chile.
          </span>
        </Marquee>
      </div>
    </footer>
  );
};

export default Nav;
