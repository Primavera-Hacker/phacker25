import MarkdownFromFile from "../../components/MakdownFromFile/MarkdownFromFile";
import { useLang } from "../../store/lang";
// import css from "./Convocatoria.module.css";

const Conducta = () => {
  const { lang, messages } = useLang();
  const { titles } = messages();

  return (
    <div className="page-container">
      <h1 className="text-heading-primary mt2XL mb4XL">{titles.codigo}</h1>

      <div className="mbXL">
        <MarkdownFromFile file={`/content/${lang}/codigo-de-conducta.md`} />
      </div>

      <div className="bottom-blank" />
    </div>
  );
};

export default Conducta;
