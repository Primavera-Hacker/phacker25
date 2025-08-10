import { LogoPrimaveraHacker } from "../../components/Logos";
import Canvas from "../../components/Canvas";
import css from "./Home.module.css";

const Home = () => {
  return (
    <div className={css.root}>
      <LogoPrimaveraHacker />
      <Canvas />
    </div>
  );
};

export default Home;
