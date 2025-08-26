import MarkdownFromFile from "../../components/MakdownFromFile/MarkdownFromFile";
import { useLang } from "../../store/lang";
// import css from "./Manifiesto.module.css";

const Manifiesto = () => {
  const { lang, messages } = useLang();

  const { titles } = messages();

  return (
    <div className="page-container">
      <h1 className="text-heading-primary mt3XL mb4XL text-align-center">
        {titles.manifiesto}
      </h1>
      <div className="mbXL">
        <MarkdownFromFile file={`/content/${lang}/manifiesto.md`} />
      </div>
      <div className="bottom-blank" />
    </div>
  );
};

export default Manifiesto;
