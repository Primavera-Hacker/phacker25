import MarkdownFromFile from "../../components/MakdownFromFile/MarkdownFromFile";
import { useLang } from "../../store/lang";
// import css from "./Convocatoria.module.css";

const Convocatoria = () => {
  const { lang, messages } = useLang();
  const { titles } = messages();

  return (
    <div className="page-container">
      <h1 className="text-heading-primary mt2XL mb4XL">
        {titles.convocatoria}
      </h1>

      <div className="mbXL">
        <MarkdownFromFile file={`/content/${lang}/convocatoria.md`} />
      </div>

      <div className="bottom-blank" />
    </div>
  );
};

export default Convocatoria;
