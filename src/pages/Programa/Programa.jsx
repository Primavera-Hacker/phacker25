import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DayTable from "../../components/DayTable";
import OverlayOpenEvent from "../../components/OverlayOpenEvent";
import programs from "../../data/programs";

import css from "./Programa.module.css";

const Programa = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openEvent, setOpenEvent] = useState(null);

  // Read openProject from URL params on mount
  useEffect(() => {
    const openProject = searchParams.get("openProject");
    if (openProject) {
      const event = programs.find((p) => p.slug === openProject);
      if (event) {
        setOpenEvent(event);
      }
    }
  }, [searchParams]);

  // Update URL params when openEvent changes
  useEffect(() => {
    if (openEvent) {
      setSearchParams({ openProject: openEvent.slug });
    } else {
      setSearchParams({});
    }
  }, [openEvent, setSearchParams]);

  const handleEventClick = (event) => {
    setOpenEvent(event);
  };

  return (
    <div className={css.root}>
      <DayTable day="viernes" onEventClick={handleEventClick} />
      <DayTable day="sabado" noHeading onEventClick={handleEventClick} />
      {openEvent && (
        <OverlayOpenEvent openEvent={openEvent} setOpenEvent={setOpenEvent} />
      )}
    </div>
  );
};

export default Programa;
