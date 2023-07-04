import React, { useState, useEffect } from "react";
import { FaHandshake } from "react-icons/fa";
import cx from "classix";

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

  function handleClick(amount: number, active: boolean, itemIndex: number) {
    setScoringItems((prevState) => {
      const newState: ScoringItem[] = [...prevState];

      active
        ? setExpeditionScore((prevScore) => prevScore - amount)
        : setExpeditionScore((prevScore) => prevScore + amount);

      newState[itemIndex]![1] = !newState[itemIndex]![1];
      active = newState[itemIndex]![1];

      return newState;
    });
  }

  const [handshakeArray, setHandShakeArray] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  function handleHandshakeClick(index: number) {
    setHandShakeArray((prevState) => {
      const newState: boolean[] = [...prevState];
      newState[index] = !newState[index];
      console.log(newState);
      return newState;
    });
  }

  const textColor = cx(
    "text-center",
    name === "snow" && "text-white",
    name === "volcano" && "text-red-500",
    name === "ocean" && "text-blue-700",
    name === "sands" && "text-yellow-400",
    name === "purple" && "text-fuchsia-800",
    name === "jungle" && "text-emerald-800"
  );

  const iconBaseStyle =
    "rounded-full border-2 border-solid cursor-pointer duration-300 p-4 flex items-center justify-center sm:w-12 sm:h-12 md:w-13 md:h-13 mt-1";

  const iconStyleInactive = cx(
    iconBaseStyle,
    name === "snow" && "border-white text-white hover:bg-slate-200",
    name === "volcano" && "border-red-500 text-red-500 hover:bg-red-200",
    name === "ocean" && "border-blue-700 text-blue-700 hover:bg-blue-500",
    name === "sands" && "border-yellow-400 text-yellow-400 hover:bg-yellow-200",
    name === "purple" &&
      "border-fuchsia-800 text-fuchsia-800 hover:bg-fuchsia-400",
    name === "jungle" &&
      "border-emerald-800 text-emerald-800 hover:bg-emerald-500"
  );

  const iconStyleActive = cx(
    iconBaseStyle,
    name === "snow" && "border-white bg-white text-black",
    name === "volcano" && "border-red-500 bg-red-500 text-white",
    name === "ocean" && "border-blue-700 bg-blue-700 text-white",
    name === "sands" && "border-yellow-400 bg-yellow-400 text-white",
    name === "purple" && "border-fuchsia-800 bg-fuchsia-800 text-white",
    name === "jungle" && "border-emerald-800 bg-emerald-800 text-white"
  );

  useEffect(() => {
    // prettier-ignore
    const sum = scoringItems.reduce((sum, curr) => sum + (curr[1] === true ? curr[0] : 0), 0);
    // prettier-ignore
    const handshakeCount = handshakeArray.reduce((count, curr) => count + (curr === true ? 1 : 0), 0);
    // prettier-ignore
    const numberCount = scoringItems.reduce((count, curr) => count + (curr[1] === true ? 1 : 0), 0);
    // prettier-ignore
    const newScore = (handshakeCount + numberCount === 0 ? 0 : sum - 20) * (handshakeCount + 1) + (numberCount + handshakeCount >= 8 ? 20 : 0);

    updateScore(name, newScore);
  }, [scoringItems, expeditionScore, name, updateScore, handshakeArray]);

  return (
    <div className="flex w-1/6 flex-wrap items-center justify-center">
      <h2 className={`${textColor} w-full text-center`}>{score}</h2>
      <div className="flex w-24 flex-col items-center justify-center justify-around sm:flex-row sm:flex-wrap">
        {handshakeArray.map((boolean, index) => {
          return (
            <div
              onClick={() => handleHandshakeClick(index)}
              className={boolean ? iconStyleActive : iconStyleInactive}
              key={`${name}-${index}`}
            >
              <FaHandshake />
            </div>
          );
        })}

        {scoringItems.map((item, index) => {
          return (
            <div
              onClick={() => handleClick(item[0], item[1], index)}
              className={item[1] ? iconStyleActive : iconStyleInactive}
              key={`${name}-${index}`}
            >
              <strong>{item[0]}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}
