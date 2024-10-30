import React, { act, useEffect, useState } from "react";
import {
  AccordionContext,
  AccordionItemContext,
  useAccordion,
  useAccordionItem,
} from "./AccordionContext";
import { FaAngleDown } from "react-icons/fa";
import "./accordion.css";

export function Accordion({
  children,
  defaultActivePanel,
  collapsible = false,
}: {
  children: React.ReactNode;
  defaultActivePanel?: string;
  collapsible?: boolean;
}) {
  const [activePanel, setActivePanel] = useState(defaultActivePanel || "");

  const handleClick = (id: string) => {
    let nextActivePanelId = id;
    if (collapsible && nextActivePanelId == activePanel) {
      nextActivePanelId = "";
    }
    setActivePanel(nextActivePanelId);
  };
  const childIds = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return child.props.id;
    }
    return null;
  })?.filter((id): id is string => id != null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActivePanel((prev) => {
        const currentIndex = childIds?.indexOf(prev) || 0;
        const nextIndex = (currentIndex + 1) % (childIds?.length || 0);
        return (childIds && childIds[nextIndex]) || "0";
      });
    }, 3000);
    return () => clearInterval(intervalId);
  }, [activePanel, childIds]);

  return (
    <div className="accordion">
      <AccordionContext.Provider
        value={{
          activePanel,
          setActivePanel: handleClick,
        }}
      >
        {children}
      </AccordionContext.Provider>
    </div>
  );
}

export function AccordionItem({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div>
      <AccordionItemContext.Provider value={{ id }}>
        {children}
      </AccordionItemContext.Provider>
    </div>
  );
}

export function AccordionPanel({
  children,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  const { activePanel } = useAccordion();
  const { id } = useAccordionItem();
  return (
    id == activePanel && (
      <div style={{}} className="accordion-panel">
        {children}
      </div>
    )
  );
}

export function AccordionHeader({
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  const { setActivePanel } = useAccordion();
  const { id } = useAccordionItem();
  return (
    <button className="accordion-header" onClick={() => setActivePanel(id)}>
      {children}
      <Icon />
    </button>
  );
}
export function Icon({}) {
  return <FaAngleDown size={25} />;
}
