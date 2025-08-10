import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import useDynamicVH from "./utils/useDynamicVH";

import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/globals.css";
import "./styles/utilities";

function App() {
  useDynamicVH();

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
