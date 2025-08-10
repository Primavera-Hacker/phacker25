import MarkdownFromFile from "../../components/MakdownFromFile/MarkdownFromFile";
// import css from "./Convocatoria.module.css";

const Conducta = () => {
  return (
    <div className="page-container">
      <h1 className="text-heading-primary mt2XL mb4XL">Codigo de Conducta</h1>

      <div className="mbXL">
        <MarkdownFromFile file="/codigo-de-conducta.md" />
      </div>

      <div className="bottom-blank" />
    </div>
  );
};

export default Conducta;
