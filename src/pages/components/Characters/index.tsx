import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Characters({ characters }: any) {
  const [data, setData] = useState(characters);
  const [status, setStatus] = useState("");

  const handleStatus = (status) => {
    console.log(status);
    setStatus("?name=rick&status=" + status.toLowerCase());
  };

  useEffect(() => {
    if (status) {
      const sendStatus = async () => {
        const res = await fetch(
          "https://rickandmortyapi.com/api/character/" + status
        );
        const data = await res.json();
        setData(data.results);
      };
      sendStatus();
    }
  }, [status]);

  /*   console.log(status);
  console.log(data);
  console.log(characters); */

  return (
    <div className="grid grid-cols-5 gap-4 ">
      {characters &&
        characters.map((character) => {
          return (
            <div className="bg-gray-800 p-2 ">
              <Link href={`/${character.id}`} className="">
                <img className="w-full" src={`${character.image}`} />
              </Link>
              <div className="flex flex-col gap-2 my-4 text-slate-400 ">
                <div className="flex justify-between items-center ">
                  <Link
                    href={`/${character.id}`}
                    className="text-2xl text-white hover:text-green-500 "
                  >
                    {character.name}{" "}
                  </Link>
                  <button
                    onClick={() => handleStatus(character.status)}
                    className={
                      character.status === "Alive"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {character.status}{" "}
                  </button>
                </div>
                <div>
                  {" "}
                  <h1>{character.species} </h1>
                </div>
                <div>
                  <h1 className="text-xl text-white">Last Known Location:</h1>
                  <h1>{character.location?.name} </h1>
                </div>
                <div>
                  <h1 className="text-xl text-white">Character Origin</h1>
                  <h1>{character.origin.name} </h1>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
