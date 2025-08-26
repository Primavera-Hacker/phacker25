import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

import { paths } from "../Router/routes";

import css from "./Footer.module.css";
import cn from "classnames";
import { useLang } from "../../store/lang";

const Nav = () => {
  const { messages } = useLang();
  const { codigo, archivo, footer } = messages();

  return (
    <footer className={css.root}>
      <div className={cn(css.rect, css.redRect, "bgRed")} />
      <div className={cn(css.rect, css.jp, "bgGrey800 bgPinkLines")}>
        <strong>春ハッカー</strong>
      </div>
      <div className={css.links}>
        <Link
          to={paths.conducta}
          className={cn(css.link, "text-eyebrow text-uppercase")}
        >
          {codigo}
        </Link>{" "}
        <a href="#" className={cn(css.link, "text-eyebrow text-uppercase")}>
          {archivo}
        </a>
      </div>
      <div className={cn(css.info, "bgGrey200 bgGreenLines")}>
        <Marquee autoFill>
          <span style={{ marginLeft: "1rem" }}>{footer}</span>
        </Marquee>
      </div>
    </footer>
  );
};

export default Nav;
