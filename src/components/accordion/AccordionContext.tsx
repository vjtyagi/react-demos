import { createContext, useContext } from "react";

export const AccordionContext = createContext<{
  activePanel: string;
  setActivePanel: Function;
}>({
  activePanel: "",
  setActivePanel: () => {},
});

export const AccordionItemContext = createContext({ id: "" });

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (context == undefined) {
    throw new Error("useAccordion must be used within a <Accordion />");
  }
  return context;
};
export const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (context == undefined) {
    throw new Error("useAccordionItem must be used within a <AccordionItem />");
  }
  return context;
};
