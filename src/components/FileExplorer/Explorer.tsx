import { MouseEventHandler, useEffect, useRef, useState } from "react";
import "./explorer.css";
import {
  FaAngleDown,
  FaAngleRight,
  FaFile,
  FaFolder,
  FaFolderOpen,
  FaTrash,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { directoryData, DirectoryNode, NodeType } from "./data";
export default function Explorer() {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState(directoryData);
  function toggleExplorer() {
    setIsOpen((prev) => !prev);
  }
  function addEntry({
    directory,
    parentPath,
    newEntry,
  }: {
    directory: DirectoryNode;
    parentPath: string;
    newEntry: DirectoryNode;
  }) {
    if (directory.path === parentPath) {
      if (!directory.children) {
        directory.children = [];
      }
      //add the new entry
      directory.children.push(newEntry);
      return true;
    }

    if (directory.children) {
      for (let child of directory.children) {
        if (addEntry({ directory: child, parentPath, newEntry })) {
          return true;
        }
      }
    }
    return false;
  }
  function addNewEntry(path: string, value: string, type: NodeType) {
    const newEntry = {
      type: type,
      value: value,
      path: `${path}/${value}`,
    };
    addEntry({
      directory: data,
      parentPath: path,
      newEntry,
    });
    setData({ ...data });
  }
  console.log("updated data", data);
  return (
    <div className="explorer">
      <div className="explorer-box">
        <div className="explorer-header">
          <div className="explorer-title">
            <Icon
              name={isOpen ? "angledown" : "angleright"}
              customClass="file-down"
              size="25"
              onClick={toggleExplorer}
            />
            Files
          </div>
          <div className="header-actions">
            <Icon name="file" size="25" style={{ fill: "gray" }} />
            <Icon name="folder" size="25" style={{ fill: "gray" }} />
          </div>
        </div>
        {isOpen && (
          <div className="explorer-body">
            {[data].map((record, i) => {
              return (
                <Node
                  key={`${record.type}-${record.value}-${i}`}
                  path={record.path}
                  expanded={record.isOpen}
                  type={record.type}
                  value={record.value}
                  children={record.children}
                  onNewNode={(path: string, value: string, type: NodeType) => {
                    console.log("onnewnode called", path, value, type);
                    addNewEntry(path, value, type);
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Node({
  type,
  value,
  path,
  editMode,
  children,
  expanded,
  onSave,
  onNewNode,
}: {
  type: NodeType;
  value: string;
  path: string;
  editMode?: boolean;
  expanded?: boolean;
  children?: DirectoryNode[];
  onSave?: Function;
  onNewNode: Function;
}) {
  const [isOpen, setIsOpen] = useState(expanded);
  const [name, setName] = useState(value);
  const [isEditing, setIsEditing] = useState(editMode);
  const [showActions, setShowActions] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [newType, setNewType] = useState<NodeType>("file");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setName(value);
  }
  function handleMouseOver() {
    setShowActions(true);
  }
  function handleMouseOut() {
    setShowActions(false);
  }
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    if (inputRef.current && !inputRef.current.contains(target)) {
      setIsEditing(false);
    }
  }
  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing]);

  function createNewFile() {
    setIsOpen(true);
    setIsNew(true);
    setNewType("file");
  }
  function createNewFolder() {
    setIsOpen(true);
    setIsNew(true);
    setNewType("folder");
  }
  function handleSave() {
    setIsEditing(false);
    setIsNew(false);
    onSave && onSave(name, path);
  }
  return (
    <div className="node">
      <div
        className="box-row"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div
          className="file-details-section"
          {...(type == "folder"
            ? { onClick: () => setIsOpen((prev) => !prev) }
            : {})}
        >
          <Icon
            name={`${
              type == "file" ? "file" : isOpen ? "folder_open" : "folder"
            }`}
            size="25"
          />
          {!isEditing && <label className="file-label">{name}</label>}
          {isEditing && (
            <input
              ref={inputRef}
              className="file-input"
              type="text"
              onChange={handleChange}
              value={name}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSave();
                }
              }}
            />
          )}
        </div>

        {showActions && (
          <div className="file-actions">
            <Icon name="edit" size="20" onClick={() => setIsEditing(true)} />
            {type == "folder" && (
              <>
                <Icon name="file" size="20" onClick={createNewFile} />
                <Icon name="folder" size="20" onClick={createNewFolder} />
              </>
            )}
            <Icon
              name="trash"
              size="20"
              onClick={() => console.log("delete clicked")}
            />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="node-content">
          {isNew && (
            <Node
              type={newType}
              value=""
              path={path}
              editMode={true}
              onNewNode={() => {}}
              onSave={(newValue: string, parentPath: string) => {
                setIsNew(false);
                console.log("value saved", newValue, parentPath);
                onNewNode(parentPath, newValue, newType);
                setIsEditing(false);
                setIsNew(false);
                //how to add the new value under the desired parent in the main object
              }}
            />
          )}
          {children &&
            children.map((record, i) => (
              <Node
                key={`${record.type}-${record.value}-${i}`}
                type={record.type}
                value={record.value}
                children={record.children}
                path={record.path}
                onNewNode={onNewNode}
              />
            ))}
        </div>
      )}
    </div>
  );
}

function Icon({
  name,
  style = {},
  customClass,
  size,
  onClick,
  ...rest
}: {
  name: string;
  style?: object;
  customClass?: string;
  size?: string;
  onClick?: MouseEventHandler;
}) {
  function renderIcon(name: string) {
    switch (name) {
      case "file":
        return (
          <FaFile
            style={style}
            size={size}
            {...(onClick ? { onClick: onClick } : {})}
            {...rest}
          />
        );
      case "folder":
        return (
          <FaFolder
            style={style}
            {...(onClick ? { onClick: onClick } : {})}
            size={size}
            {...rest}
          />
        );
      case "folder_open":
        return (
          <FaFolderOpen
            style={style}
            {...(onClick ? { onClick: onClick } : {})}
            size={size}
            {...rest}
          />
        );
      case "angledown":
        return (
          <FaAngleDown
            style={style}
            {...(onClick ? { onClick: onClick } : {})}
            size={size}
            {...rest}
          />
        );
      case "angleright":
        return (
          <FaAngleRight
            style={{ ...style }}
            {...(onClick ? { onClick: onClick } : {})}
            size={size}
            {...rest}
          />
        );
      case "edit":
        return (
          <MdEdit
            style={{ ...style }}
            {...(onClick ? { onClick: onClick } : {})}
            size={size}
            {...rest}
          />
        );
      case "trash":
        return (
          <FaTrash
            style={{ ...style }}
            {...(onClick ? { onClick: onClick } : {})}
            size={size}
            {...rest}
          />
        );
      default:
        return "";
    }
  }
  return (
    <div className={`icon ${customClass ? customClass : ""}`}>
      {renderIcon(name)}
    </div>
  );
}
