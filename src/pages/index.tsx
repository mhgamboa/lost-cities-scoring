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
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-indigo-400 to-blue-300">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-yellow-200 sm:text-[5rem]">
            {Object.values(scores).reduce((acc, curr) => acc + curr, 0)} Points
          </h1>

          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div> */}
          <section className="flex w-full">
            <Expedition
              name="sands"
              updateScore={updateScore}
              score={scores.sands}
            />
            <Expedition
              name="snow"
              updateScore={updateScore}
              score={scores.snow}
            />
            <Expedition
              name="ocean"
              updateScore={updateScore}
              score={scores.ocean}
            />
            <Expedition
              name="jungle"
              updateScore={updateScore}
              score={scores.jungle}
            />
            <Expedition
              name="volcano"
              updateScore={updateScore}
              score={scores.volcano}
            />
            <Expedition
              name="purple"
              updateScore={updateScore}
              score={scores.purple}
            />
          </section>
        </div>
      </main>
    </>
  );
}
