import React from "react";
import { Card } from "../stylesc/styles";
import { api } from "../lib/axios";

interface poolProps {
  guesses: any[];
}

export default function pool(props: poolProps) {
  return (
    <div>
      <aside className=" grid grid-cols-1">
        {props.guesses.map((guess, pos) => (
          <div key={guess.id} className="bg-amarelo-500 mt-10">
            <div className="flex justify-between pt-2 pr-2 pl-2">
              <h1 className="font-bold ">{guess.game.firstTeamCountryCode}</h1>
              <h1>{guess.participant.user.name}</h1>
              <h1 className="font-bold">{guess.game.secondTeamCountryCode}</h1>
            </div>
            <div className="flex item-center justify-center mt-8 gap-10">
              <strong className="text-7xl">{guess.firstTeamPoints}</strong>
              <strong className="text-7xl">x</strong>
              <strong className="text-7xl">{guess.secondTeamPoints}</strong>

              <small>
                {new Intl.DateTimeFormat(`pt-br`, {}).format(
                  new Date(guess.createdAt)
                )}
              </small>
            </div>
          </div>
        ))}
        c
      </aside>
    </div>
  );
}

export const getServerSideProps = async () => {
  const [guesses] = await Promise.all([api.get("/guess/score")]);

  return {
    props: {
      guesses: guesses.data.guesses,
    },
  };
};
