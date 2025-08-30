import { useRef } from "react";
import cn from "classnames";

import { useLang } from "../../store/lang";
import MarkdownFromFile from "../../components/MakdownFromFile/MarkdownFromFile";

import css from "./Evento.module.css";

const Evento = () => {
  const ref = useRef();
  const { lang, messages } = useLang();
  const handleScrollToFechas = () => {
    if (!ref.current) return;

    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { titles } = messages();
  const { dates } = messages();
  return (
    <div className="page-container">
      <h1 className="text-heading-primary mt2XL mb4XL">
        Primavera Hacker 2025 :: <br />
        {titles.evento}
      </h1>

      <button className={css.irButton} onClick={handleScrollToFechas}>
        {dates.cta}
      </button>
      <div className="mbXL">
        <MarkdownFromFile file={`/content/${lang}/evento.md`} />
      </div>
      <div className={css.fechasWrapper} ref={ref}>
        <h3 className={cn(css.fechasTitle, "text-heading-secondary")}>
          {dates.title}
        </h3>
        <div className={css.fechas}>
          <div className={css.fechaItem}>
            <h4 className="text-body-semibold">{dates.notification.date}</h4>
            <p className="text-body-light">{dates.notification.label}</p>
          </div>
          <div className={css.fechaItem}>
            <h4 className="text-body-semibold">{dates.closing.date} </h4>
            <p className="text-body-light">{dates.closing.label}</p>
          </div>
          <div className={css.fechaItem}>
            <h4 className="text-body-semibold">{dates.event.date}</h4>
            <p className="text-body-light">
              {dates.event.label}
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-blank" />
    </div>
  );
};

export default Evento;
