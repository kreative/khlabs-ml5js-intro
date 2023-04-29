import { useState } from "react";
import Router from "next/router";

export default function Input() {
  const [input, setInput] = useState("");
  const [labelColor, setLabelColor] = useState("text-gray-500");
  const [label, setLabel] = useState("Topic");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.length === 0) {
      setLabelColor("text-red-500");
      setLabel("Please enter a topic!");
      return;
    }

    Router.push(`/sentiment?topic=${encodeURI(input)}`);
  };

  const handleInput = (e) => {
    setLabelColor("text-gray-500");
    setLabel("Team Name");
    setInput(e.target.value);
  };

  return (
    <div className={""}>
      <div className="relative pb-4">
        <label
          htmlFor="team-name"
          className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
        >
          <span className={labelColor}>{label}</span>
        </label>
        <input
          type="text"
          name="team-name"
          id="name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Oakland A's"
          onChange={handleInput}
        />
      </div>
      <div className={"flex flex-col items-center justify-center"}>
        <button
          type="button"
          className="relative rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubmit}
        >
          Analyze
        </button>
      </div>
    </div>
  );
}
