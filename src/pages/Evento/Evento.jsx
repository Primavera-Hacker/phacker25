import { useRef } from "react";
import cn from "classnames";

import MarkdownFromFile from "../../components/MakdownFromFile/MarkdownFromFile";
import css from "./Evento.module.css";

const Evento = () => {
  const ref = useRef();
  const handleScrollToFechas = () => {
    if (!ref.current) return;

    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="page-container">
      <h1 className="text-heading-primary mt2XL mb4XL">
        Primavera Hacker 2025 :: <br />
        Crónicamente Online
      </h1>
      <button className={css.irButton} onClick={handleScrollToFechas}>
        IR A FECHAS IMPORTANTES ↓
      </button>
      <div className="mbXL">
        <MarkdownFromFile file="/evento.md" />
      </div>
      <div className={css.fechasWrapper} ref={ref}>
        <h3 className={cn(css.fechasTitle, "text-heading-secondary")}>
          FECHAS IMPORTANTES
        </h3>
        <div className={css.fechas}>
          <div className={css.fechaItem}>
            <h4 className="text-body-semibold">8 de octubre 2025</h4>
            <p className="text-body-light">Notificación de resultados</p>
          </div>
          <div className={css.fechaItem}>
            <h4 className="text-body-semibold">20 de septiembre 2025 </h4>
            <p className="text-body-light">Cierre de la convocatoria</p>
          </div>
          <div className={css.fechaItem}>
            <h4 className="text-body-semibold">5 y 6 de diciembre</h4>
            <p className="text-body-light">
              2025 Primavera Hacker en Santiago, Chile
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-blank" />
    </div>
  );
};

export default Evento;
