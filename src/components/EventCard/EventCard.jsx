import css from "./EventCard.module.css";

const MAX_BODY = 180;

const EventCard = ({ titulo, eje, autor, resumen, onClick }) => {
  return (
    <div className={css.root} onClick={onClick}>
      <div className="text-eyebrow text-uppercase">
        <span className={css.category}>{eje}</span> —{" "}
        <span className={css.author}>{autor}</span>
      </div>

      <h3 className={css.title}>{titulo}</h3>

      <p className={"text-body-light "}>
        {resumen && resumen.length > MAX_BODY
          ? `${resumen.substring(0, MAX_BODY)}...`
          : resumen}
      </p>
    </div>
  );
};

export default EventCard;
