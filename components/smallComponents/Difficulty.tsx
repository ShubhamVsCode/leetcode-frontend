import React from "react";

const Difficulty = ({ difficulty }: { difficulty: String }) => {
  if (difficulty === "Easy") {
    return (
      <span
        className={`bg-green-100 text-green-600 text-sm px-2 py-[3px] rounded-full`}
      >
        {difficulty}
      </span>
    );
  }
  if (difficulty === "Medium") {
    return (
      <span
        className={`bg-orange-200 text-orange-600 text-sm px-2 py-[3px] rounded-full`}
      >
        {difficulty}
      </span>
    );
  }
  if (difficulty === "Hard") {
    return (
      <span
        className={`bg-red-100 text-red-600 text-sm px-2 py-[3px] rounded-full`}
      >
        {difficulty}
      </span>
    );
  }
};

export default Difficulty;
