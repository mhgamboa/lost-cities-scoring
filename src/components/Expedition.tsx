import React, { useState, useEffect } from "react";

type props = {
  name: string;
  updateScore: (name: string, score: number) => void;
};

export default function Expedition({ name, updateScore }: props) {
  const [expeditionScore, setExpeditionScore] = useState(0);

  type ScoringItem = [number, boolean];
  const [scoringItems, setScoringItems] = useState<ScoringItem[]>([
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

  function handleClick(amount: number, active: boolean, itemIndex: number) {
    // let totalSum = (sum - 20) x (handshakeCount + 1) + 20(only if you have 8 or more cards)
    // cardCount >=8 && (totalSum + 20)

    setScoringItems((prevState) => {
      const newState: ScoringItem[] = [...prevState];
      active
        ? setExpeditionScore((prevScore) => prevScore - amount)
        : setExpeditionScore((prevScore) => prevScore + amount);
      newState[itemIndex][1] = !newState[itemIndex][1];
      active = newState[itemIndex][1];
      return newState;
    });

    // active
    //   ? setExpeditionScore((prevScore) => prevScore - amount)
    //   : setExpeditionScore((prevScore) => prevScore + amount);

    // setScoringItems((prevState) => {
    //   const newState: ScoringItem[] = [...prevState];

    //   newState[itemIndex][1] = !newState[itemIndex][1];

    //   console.log("newState: ", newState);
    //   return newState;
    // });
  }

  useEffect(() => {
    updateScore(name, expeditionScore);
  }, [expeditionScore, name, updateScore]);

  useEffect(() => {
    console.log("scoringItems: ", scoringItems);
  }, [scoringItems]);

  return (
    <div className="flex flex-col items-center">
      <h2>{name}</h2>

      {scoringItems.map((item, index) => {
        return (
          <div
            onClick={() => handleClick(item[0], item[1], index)}
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
