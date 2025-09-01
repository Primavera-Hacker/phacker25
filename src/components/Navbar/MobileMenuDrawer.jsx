import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../Router/routes";
import { LogoPrimaveraHacker } from "../Logos";
import { useLang } from "../../store/lang";

import css from "./Navbar.module.css";

const MobileMenuDrawer = ({ isOpen, closeDrawer }) => {
  const navigate = useNavigate();
  const { setEsp, setEng, lang, messages } = useLang();
  const { evento, convocatoria, manifiesto, codigo } = messages();

  if (!isOpen) return null;
  return (
    <div className={css.drawer}>
      <div className={css.drawerMenu}>
        <button
          onClick={() => {
            navigate(paths.home);
            closeDrawer();
          }}
        >
          <LogoPrimaveraHacker />
        </button>
        <Link
          onClick={closeDrawer}
          to={paths.evento}
          className={cn("text-link-primary", css.primaryLink)}
        >
          {evento}
        </Link>
        <Link
          onClick={closeDrawer}
          to={paths.convocatoria}
          className={cn("text-link-primary", css.primaryLink)}
        >
          {convocatoria}
        </Link>
        <Link
          onClick={closeDrawer}
          to={paths.manifiesto}
          className={cn("text-link-primary", css.primaryLink)}
        >
          {manifiesto}
        </Link>
        <Link
          onClick={closeDrawer}
          to={paths.conducta}
          className={cn("text-link-primary", css.primaryLink)}
        >
          {codigo}
        </Link>
      </div>
      <div className={css.lang}>
        <button
          data-active={lang == "esp"}
          className={cn("text-link-primary", css.primaryLink)}
          onClick={setEsp}
        >
          {lang == "esp" && "→"} ESP
        </button>
        <button
          data-active={lang == "eng"}
          className={cn("text-link-primary", css.primaryLink)}
          onClick={setEng}
        >
          {lang == "eng" && "→"} ENG
        </button>
      </div>
    </div>
  );
};

export default MobileMenuDrawer;
