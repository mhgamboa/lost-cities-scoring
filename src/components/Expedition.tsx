import React, { useState } from "react";

type props = {
  name: string;
  updateScore: (name: string, score: number) => void;
};

export default function Expedition({ name, updateScore }: props) {
  const [scoringItems, setScoreingItems] = useState([
    ["handshake1", false],
    ["handshake2", false],
    ["handshake3", false],
    [1, false],
    [2, false],
    [3, false],
    [4, false],
    [5, false],
    [6, false],
    [7, false],
    [8, false],
    [9, false],
    [10, false],
  ]);

  function handleClick() {
    // console.log(e);
    // Type 'void' is not assignable to type 'MouseEventHandler<HTMLDivElement> | undefined'.
    // let totalSum = (sum - 20) x (handshakeCount + 1) + 20(only if you have 8 or more cards)
    // cardCount >=8 && (totalSum + 20)

    updateScore(name, 5);
  }

  return (
    <div className="flex flex-col items-center">
      <h2>{name}</h2>

      {scoringItems.map((item, index) => {
        console.log(index);
        return (
          <div
            onClick={handleClick}
            className="border-White rounded-full border-2 border-solid p-3"
            key={`${name}-${index}`}
          >
            {item[0]}
          </div>
        );
      })}
    </div>
  );
}
