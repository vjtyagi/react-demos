import { useEffect, useMemo, useState } from "react";
import "./interactive.css";

import cx from "classnames";

const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

export default function InteractiveShapeGame() {
  return <GameContainer data={BOX_DATA} />;
}

function GameContainer({ data }: { data: number[][] }) {
  const [selectedBoxes, setSelectedBoxes] = useState<Set<string>>(new Set());
  const [autoDeselect, setAutoDeselect] = useState(false);
  const visibleBoxes = useMemo(
    () =>
      data.reduce((acc, curr) => {
        return acc + curr.filter((num) => num == 1).length;
      }, 0),
    [data]
  );

  function handleClick(id: string) {
    if (autoDeselect) {
      return;
    }
    setSelectedBoxes((prev) => {
      let newData = new Set(prev);
      if (prev.has(id)) {
        newData.delete(id);
      } else {
        newData.add(id);
      }
      return newData;
    });
  }
  function deselect() {
    setAutoDeselect(true);
    const keys = Array.from(selectedBoxes.keys());
    const removeNextKey = () => {
      if (keys.length > 0) {
        const currentKey = keys.shift()!;
        setSelectedBoxes((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(currentKey);
          return updatedKeys;
        });
        setTimeout(removeNextKey, 500);
      } else {
        setAutoDeselect(false);
      }
    };
    setTimeout(removeNextKey, 100);
  }
  useEffect(() => {
    if (selectedBoxes.size == visibleBoxes) {
      console.log("start deselection");
      deselect();
    }
  }, [selectedBoxes, visibleBoxes]);
  return (
    <div className="box-container">
      {data.map((record, index) => {
        return (
          <BoxRow
            key={index}
            rowNum={index}
            record={record}
            handleClick={handleClick}
            selectedBoxes={selectedBoxes}
          />
        );
      })}
    </div>
  );
}
function BoxRow({
  record,
  rowNum,
  handleClick,
  selectedBoxes,
}: {
  record: number[];
  rowNum: number;
  handleClick: Function;
  selectedBoxes: Set<string>;
}) {
  return (
    <div className="box-row">
      {record.map((val, index) => {
        let key = `${rowNum}-${index}`;
        return (
          <Box
            key={key}
            id={key}
            isSelected={selectedBoxes.has(key)}
            isHidden={val == 0}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
}

function Box({
  isSelected = false,
  isHidden = false,
  id,
  handleClick,
}: {
  isSelected?: boolean;
  isHidden?: boolean;
  id: string;
  handleClick: Function;
}) {
  return (
    <div
      className={cx({
        box: true,
        "box--selected": isSelected,
        "box-hidden": isHidden,
      })}
      onClick={() => handleClick(id)}
    ></div>
  );
}
