import MarkdownFromFile from "../../components/MakdownFromFile/MarkdownFromFile";
// import css from "./Convocatoria.module.css";

const Convocatoria = () => {
  return (
    <div className="page-container">
      <h1 className="text-heading-primary mt2XL mb4XL">CONVOCATORIA</h1>

      <div className="mbXL">
        <MarkdownFromFile file="/convocatoria.md" />
      </div>

      <div className="bottom-blank" />
    </div>
  );
};

export default Convocatoria;
