import { Link } from "react-router-dom";
import classNames from "classnames";

import { LogoPHacker25 } from "../Logos";
import { paths } from "../Router/routes";

import css from "./Navbar.module.css";
import { useLang } from "../../store/lang";

const SobreMenu = () => {
  const { setEsp, setEng, lang } = useLang();

  return (
    <div className={css.sobremenu}>
      <Link to={paths.home} className={css.logoPhacker25}>
        <LogoPHacker25 />
      </Link>

      <div className={css.lang}>
        <button
          data-active={lang == "esp"}
          className={classNames("text-eyebrow", css.langButton)}
          onClick={setEsp}
        >
          ESP
        </button>
        <button
          data-active={lang == "eng"}
          className={classNames("text-eyebrow", css.langButton)}
          onClick={setEng}
        >
          ENG
        </button>
      </div>
    </div>
  );
};

export default SobreMenu;
