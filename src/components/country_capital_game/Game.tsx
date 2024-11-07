import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import DATA from "./data";
import "./country.css";
import cx from "classnames";
export default function Game() {
  return (
    <div className="country-game">
      <GameContainer data={DATA} />
    </div>
  );
}
function GameContainer({ data }: { data: Record<string, string> }) {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [correctTiles, setCorrectTiles] = useState<string[]>([]);
  const isGameOver = useMemo(() => options.length == 0, [options]);
  function handleTileSelection(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement;
    const value = target.getAttribute("data-value");
    const newSelection = selectedTiles.concat(value as string);
    if (selectedTiles.length == 2 || selectedTiles.includes(value as string)) {
      return;
    }
    if (newSelection.length === 2) {
      const [first, second] = newSelection;
      if (data[first] === second || data[second] === first) {
        //match
        setCorrectTiles(newSelection);
        setTimeout(() => {
          setCorrectTiles([]);
          setSelectedTiles([]);
          //filter out selection from the data
          setOptions((prev: string[]) => {
            return prev.filter((option) => !newSelection.includes(option));
          });
        }, 1000);
      } else {
        setSelectedTiles(newSelection);
        setTimeout(() => {
          setSelectedTiles([]);
        }, 1000);
      }
    } else {
      setSelectedTiles(newSelection);
    }
  }
  useEffect(() => {
    const allOptions = Object.entries(data).flat();
    setOptions(shuffle(allOptions));
  }, []);

  //once shuffled data is in place, then we have to maintain it
  // we need to implement some way of matching the selected tiles
  return (
    <div className="game-container">
      {options.map((record) => {
        const isSelected =
          selectedTiles.includes(record) || correctTiles.includes(record);
        const isCorrect = correctTiles.includes(record);
        const isWrong = isSelected && selectedTiles.length == 2 && !isCorrect;
        return (
          <Tile
            key={record}
            name={record}
            onClick={handleTileSelection}
            isSelected={isSelected}
            isWrong={isWrong}
            isCorrect={isCorrect}
          />
        );
      })}
      {isGameOver && "Congratulations"}
    </div>
  );
}
function Tile({
  name,
  onClick,
  isSelected,
  isWrong,
  isCorrect,
}: {
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isSelected: boolean;
  isWrong: boolean;
  isCorrect: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cx({
        "game-tile": true,
        "game-tile--selected": isSelected && !isWrong && !isCorrect,
        "game-tile--wrong": isWrong,
        "game-tile--correct": isCorrect,
      })}
      data-value={name}
    >
      {name}
    </button>
  );
}
function shuffle<T>(arr: T[]) {
  let n = arr.length;
  for (let i = n - 1; i >= 0; i--) {
    //Math.random returns a number between 0 and 1 (exclusive)
    // if we multiple Math.random() output with any number n
    // the output comes in the range 0 to n(exclusive)
    // that's why we multiply with i+1, to make i inclusive, so final range is 0 to i
    // Once we have the random index, we swap it with current index i
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
