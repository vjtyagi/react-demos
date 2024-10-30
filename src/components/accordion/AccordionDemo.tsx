import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "./Accordion";

export default function AccordionDemo() {
  return (
    <div className="accordion-demo">
      <Accordion defaultActivePanel="1" collapsible={true}>
        <AccordionItem id="1">
          <AccordionHeader>What is React?</AccordionHeader>
          <AccordionPanel>Section 1 Content</AccordionPanel>
        </AccordionItem>
        <AccordionItem id="2">
          <AccordionHeader>Is It Free?</AccordionHeader>
          <AccordionPanel>Section 2 Content</AccordionPanel>
        </AccordionItem>
        <AccordionItem id="3">
          <AccordionHeader>Take Me Home</AccordionHeader>
          <AccordionPanel>Section 3 Content</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
