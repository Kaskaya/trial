import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Character() {
  const [character, setCharacter] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const sendApi = async (param: any) => {
      const res = await fetch(
        "https://rickandmortyapi.com/api/character/" + param
      );
      const data = await res.json();
      setCharacter(data);
    };

    if (router.query.id) {
      sendApi(router.query.id);
    }
  }, [router.query, character]);
  console.log(character);

  return (
    <div>
      {character && (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-400 ">
          <div className="flex ">
            <div>
              <img className="w-full" src={`${character.image}`} />
            </div>
            <div className="flex items-center p-8 justify-between bg-slate-800 ">
              <h1 className="text-white text-2xl  ">{character.name}</h1>
            </div>
            <div className="flex flex-col bg-slate-900 p-8 gap-4">
              <h1
                className={
                  character.status === "Alive"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {character.status}{" "}
              </h1>
              <div>
                <h1>Character Location</h1>
                <h1 className="text-xl text-white">
                  {character.location?.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
