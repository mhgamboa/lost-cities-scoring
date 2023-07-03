import React, { useState, useEffect } from "react";
import { FaHandshake } from "react-icons/fa";

type props = {
  name: string;
  updateScore: (name: string, score: number) => void;
  score: number;
};

export default function Expedition({ name, score, updateScore }: props) {
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

  const [handshakeArray, setHandShakeArray] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  function handleClick(amount: number, active: boolean, itemIndex: number) {
    setScoringItems((prevState) => {
      const newState: ScoringItem[] = [...prevState];

      active
        ? setExpeditionScore((prevScore) => prevScore - amount)
        : setExpeditionScore((prevScore) => prevScore + amount);
      newState[itemIndex][1] = !newState[itemIndex][1];
      active = newState[itemIndex][1];
      return newState;
    });
  }

  function handleHandshakeClick(index: number) {
    setHandShakeArray((prevState) => {
      const newState: boolean[] = [...prevState];
      newState[index] = !newState[index];
      console.log(newState);
      return newState;
    });
  }

  useEffect(() => {
    // prettier-ignore
    const sum = scoringItems.reduce((sum, curr) => sum + (curr[1] === true ? curr[0] : 0), 0);
    // prettier-ignore
    const handshakeCount = handshakeArray.reduce((count, curr) => count + (curr === true ? 1 : 0), 0);
    // prettier-ignore
    const numberCount = scoringItems.reduce((count, curr) => count + (curr[1] === true ? 1 : 0), 0);
    // prettier-ignore
    const newScore = (handshakeCount + numberCount === 0 ? 0 : sum - 20) * (handshakeCount + 1) +
      (numberCount + handshakeCount >= 8 ? 20 : 0);

    updateScore(name, newScore);
  }, [scoringItems, expeditionScore, name, updateScore, handshakeArray]);

  return (
    <div>
      <h2>
        {name} = {score}
      </h2>
      <div className="flex flex-col items-center">
        {handshakeArray.map((boolean, index) => {
          return (
            <div
              onClick={() => handleHandshakeClick(index)}
              className="border-White rounded-full border-2 border-solid p-3"
              key={`${name}-${index}`}
            >
              <FaHandshake className="text-white" />
            </div>
          );
        })}

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
    </div>
  );
}
