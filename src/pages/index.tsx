import { useRouter } from "next/router";
import Characters from "./components/Characters";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home({ data }: any) {
  const [characters, setCharacters] = useState(data?.results);
  const [status, setStatus] = useState("");
  /*   let arr = characters.flat(); */

  function uniqueFilter(value, index, self) {
    return self.indexOf(value) === index;
  }

  const newArray = characters.filter(uniqueFilter);

  /*   console.log(arr); */
  /*   const [handleStatus, setHandleStatus] = useState(""); */
  const router = useRouter();

  /*  const handleRouter = (data: string) => {
    router.push(data);
    console.log(data);
  }; */

  const handleStatus = (status) => {
    console.log(status);
    setStatus("?name=rick&status=" + status);
  };

  useEffect(() => {
    if (status) {
      const sendStatus = async () => {
        const res = await fetch(
          "https://rickandmortyapi.com/api/character/" + status
        );
        const data = await res.json();
        console.log(data);
        setCharacters(data.results);
      };
      sendStatus();
    }
  }, [status]);

  /* useEffect(() => {
    const sendStatus = async () => {
      console.log(router.query);
      const res = await fetch(
        "https://rickandmortyapi.com/api/character/" + router.query
      );
      const data = await res.json();
      setCharacters(data.results);
    };
    sendStatus();
  }, [router.query handleStatus]); */

  console.log(router.query);

  /*   console.log(data?.results); */

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 m-8 ">
      <header className="flex flex-row gap-8 m-8 ">
        <h1 className="text-5xl font-bold ">The Rick And Morty Characters</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="flex justify-between gap-4">
            <h1>Status:</h1>
            <button
              onClick={() => handleStatus("alive")}
              className="text-green-500 hover:text-green-300"
            >
              Alive
            </button>
            <button
              onClick={() => handleStatus("dead")}
              className="text-red-500 hover:text-red-300"
            >
              Dead
            </button>
            <button
              onClick={() => handleStatus("unknown")}
              className="text-gray-500 hover:text-gray-300"
            >
              Unknown
            </button>
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="flex justify-between flex-wrap gap-4 max-w-[900px]">
            <h1>Last Known Location:</h1>
            {newArray &&
              newArray.map((character) => {
                return (
                  <button
                    onClick={() => handleStatus(character.location)}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    {character.location.name}
                  </button>
                );
              })}
          </div>
        </div>
      </header>

      {/*      <Characters characters={characters} /> */}

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
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();
  return { props: { data } };
}
