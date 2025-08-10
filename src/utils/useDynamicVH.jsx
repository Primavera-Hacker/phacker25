import { useEffect } from "react";
import useEventListener from "./useEventListener";

const useDynamicVH = () => {
  const updateVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--dvh", `${vh}px`);
  };

  useEffect(() => {
    updateVH();
  }, []);

  useEventListener("resize", updateVH);
};

export default useDynamicVH;
