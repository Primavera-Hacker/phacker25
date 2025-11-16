import classNames from "classnames";
import css from "./EventCard.module.css";

const MAX_BODY = 180;

const EventCard = ({ titulo, eje, autor, resumen, onClick, mesa }) => {
  return (
    <div className={css.root} onClick={onClick}>
      <div className={classNames(css.tags, "text-eyebrow text-uppercase")}>
        <span className={classNames(css.category, "bgGreenLines")}>{eje}</span>
        <span className={css.author}>{autor}</span>
      </div>

      {mesa && (
        <strong
          className={classNames("text-eyebrow text-uppercase mbS", css.mesa)}
        >
          {mesa}
        </strong>
      )}
      <h3 className={css.title}>{titulo}</h3>

      <p className={css.body}>
        <br />
        {resumen && resumen.length > MAX_BODY
          ? `${resumen.substring(0, MAX_BODY)}...`
          : resumen}
      </p>
    </div>
  );
};

export default EventCard;
