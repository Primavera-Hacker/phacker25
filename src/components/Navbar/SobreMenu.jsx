import { Link } from "react-router-dom";
import classNames from "classnames";

import { LogoPHacker25 } from "../Logos";
import { paths } from "../Router/routes";

import css from "./Navbar.module.css";

const SobreMenu = () => {
  return (
    <div className={css.sobremenu}>
      <Link to={paths.home} className={css.logoPhacker25}>
        <LogoPHacker25 />
      </Link>

      <div className={css.lang}>
        <button className={classNames("text-eyebrow", css.langButton)}>
          ESP
        </button>
        <button className={classNames("text-eyebrow", css.langButton)} disabled>
          ENG
        </button>
      </div>
    </div>
  );
};

export default SobreMenu;
