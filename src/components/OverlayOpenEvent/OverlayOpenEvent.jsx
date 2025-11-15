import { useEffect, useRef } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import css from "./OverlayOpenEvent.module.css";

export default function OverlayOpenEvent({ openEvent, setOpenEvent }) {
  const wrapperRef = useRef(null);

  // Close on click outside
  useClickAway(wrapperRef, () => {
    setOpenEvent(null);
  });

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setOpenEvent(null);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setOpenEvent]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    // Save current overflow value
    const originalOverflow = document.body.style.overflow;

    // Disable body scroll
    document.body.style.overflow = "hidden";

    // Re-enable body scroll on cleanup
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!openEvent) return null;

  return (
    <div className={css.root}>
      <div className={css.overlay} onClick={() => setOpenEvent(null)} />
      <div className={css.wrapper} ref={wrapperRef}>
        <button className={css.closeButton} onClick={() => setOpenEvent(null)}>
          ✕
        </button>
        <pre>{JSON.stringify(openEvent, null, 2)}</pre>
      </div>
    </div>
  );
}
