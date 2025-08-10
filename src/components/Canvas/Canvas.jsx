import React, { useEffect, useRef } from "react";

const Canvas = () => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    // Inject experience here
  }, []);

  return <canvas ref={ref} style={{ width: "100%", height: "100%" }} />;
};

export default Canvas;
