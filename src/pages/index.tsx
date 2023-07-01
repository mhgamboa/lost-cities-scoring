import { useState, useCallback } from "react";
import Head from "next/head";
import Expedition from "~/components/Expedition";

export default function Home() {
  const [scores, setScores] = useState({
    snow: 0,
    jungle: 0,
    sands: 0,
    ocean: 0,
    volcano: 0,
    purple: 0,
  });

  const updateScore = useCallback((name: string, score: number) => {
    setScores((prevScores) => ({
      ...prevScores,
      [name]: score,
    }));
  }, []);

  return (
    <>
      <Head>
        <title>Lost Cities Scoring Calculator</title>
        <meta name="description" content="Lost Cities Scoring" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-300 to-indigo-400">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-yellow-200 sm:text-[5rem]">
            Lost Cities Scoring Calculator
            {scores.volcano}
          </h1>
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div> */}
          <div className="flex">
            <Expedition name="volcano" updateScore={updateScore} />
          </div>
        </div>
      </main>
    </>
  );
}
