import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useIntl } from "react-intl";
import { useLocale } from "../../hooks/useLocale";

import { paths } from "../Router/routes";

import css from "./Footer.module.css";
import cn from "classnames";

const Nav = () => {
  const intl = useIntl();
  const { locale } = useLocale();
  const codigo = intl.formatMessage({ id: "codigo" });
  const archivo = intl.formatMessage({ id: "archivo" });
  const footer = intl.formatMessage({ id: "footer" });

  const getLocalizedPath = (path) => {
    return locale === "en" ? `/en${path}` : path;
  };

  return (
    <footer className={css.root}>
      <div className={cn(css.rect, css.redRect, "bgRed")} />
      <div className={cn(css.rect, css.jp, "bgGrey800 bgPinkLines")}>
        <strong>春ハッカー</strong>
      </div>
      <div className={css.links}>
        <Link
          to={getLocalizedPath(paths.conducta)}
          className={cn(css.link, "text-eyebrow text-uppercase")}
        >
          {codigo}
        </Link>{" "}
        <a href="https://archivo.phacker.org/elpasado/" className={cn(css.link, "text-eyebrow text-uppercase")}  target="_blank" rel="noopener noreferrer">
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
