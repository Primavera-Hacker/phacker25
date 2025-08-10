import { useEffect, useRef } from "react";
import Experience from "../../experience/Experience";

const Canvas = () => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    new Experience(ref.current);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ width: "100%", height: "100%", borderRadius: "18px" }}
    />
  );
};

export default Canvas;
