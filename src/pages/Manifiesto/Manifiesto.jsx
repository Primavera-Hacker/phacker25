import MarkdownFromFile from "../../components/MakdownFromFile/MarkdownFromFile";
// import css from "./Manifiesto.module.css";

const Manifiesto = () => {
  return (
    <div className="page-container">
      <h1 className="text-heading-primary mt3XL mb4XL text-align-center">
        MANIFIESTO
      </h1>

      <div className="mbXL">
        <MarkdownFromFile file="/manifiesto.md" />
      </div>

      <div className="bottom-blank" />
    </div>
  );
};

export default Manifiesto;
