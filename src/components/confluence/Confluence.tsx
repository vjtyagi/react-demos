import { MouseEventHandler, useState } from "react";
import "./confluence.css";
import DATA, { Article } from "./data/tree";
import { FaAngleDown, FaAngleRight, FaCircle } from "react-icons/fa";

export default function Confluence() {
  return (
    <div className="sidebar">
      <Nodes data={DATA} />
    </div>
  );
}
function Nodes({ data }: { data: Article[] }) {
  return (
    <ul className="nodes">
      {data.map((record: Article) => (
        <Node key={record.id} {...record} />
      ))}
    </ul>
  );
}
function Icon({
  isOpen,
  isParentNode,
  onClick,
}: {
  isOpen: boolean;
  isParentNode: boolean;
  onClick: MouseEventHandler<SVGElement>;
}) {
  if (isParentNode) {
    return (
      <span>
        {isOpen ? (
          <FaAngleDown onClick={onClick} />
        ) : (
          <FaAngleRight onClick={onClick} />
        )}
      </span>
    );
  }
  return <FaCircle style={{ height: "6px" }} />;
}
function Node(data: Article) {
  const [isOpen, setIsOpen] = useState(false);
  const isParentNode = Boolean(data.children && data.children.length);
  return (
    <li>
      <div className="node">
        <div className="label">
          <Icon
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            isParentNode={isParentNode}
          />
          <a href={data.link}>{data.label}</a>
        </div>
        {isParentNode && isOpen ? (
          <div className="node-content">
            <Nodes data={data.children || []} />
          </div>
        ) : null}
      </div>
    </li>
  );
}
