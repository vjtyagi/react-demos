import { FaAngleDown, FaAngleRight, FaCircle } from "react-icons/fa";
import "./confluence.css";
import DATA, { Article } from "./data/tree";
import { MouseEventHandler, useState } from "react";
export default function Confluence() {
  return (
    <div className="sidebar">
      <List data={DATA} />
    </div>
  );
}
interface ListProps {
  data: Article[];
}
function List({ data }: ListProps) {
  return (
    <ul className="list">
      {data.map((record: Article) => (
        <ListItem key={record.id} data={record} />
      ))}
    </ul>
  );
}
interface ListItemProps {
  data: Article;
}
function ListItem({ data }: ListItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isParentNode = Boolean(data.children && data.children.length);
  return (
    <li className="list-item">
      <div className="list-node">
        <div className="label">
          <Icon
            isOpen={isOpen}
            isParentNode={isParentNode}
            onClick={() => setIsOpen(!isOpen)}
          />
          <a href={data.link}>{data.label}</a>
        </div>
        <div className="list-item-children">
          {isParentNode && isOpen && data.children && (
            <List data={data.children} />
          )}
        </div>
      </div>
    </li>
  );
}
interface IconProps {
  isParentNode: boolean;
  isOpen: boolean;
  onClick: MouseEventHandler;
}
function Icon({ isParentNode, isOpen, onClick }: IconProps) {
  if (isParentNode) {
    return (
      <span onClick={onClick}>
        {isOpen ? <FaAngleDown /> : <FaAngleRight />}
      </span>
    );
  }
  return <FaCircle style={{ height: "6px" }} />;
}
