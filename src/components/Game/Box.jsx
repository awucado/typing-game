import * as React from "react";
import { VscDebugRestart } from "react-icons/vsc";

import { shuffleList } from "@/components/Game/functions";
import TypingInput from "@/components/Game/TypingInput";
import Tooltip from "@/components/Tooltip";
import useTyping from "react-typing-game-hook";

import { usePreferenceContext } from "@/context/Preference/PreferenceContext";

export default function Box() {
  const _ = require("lodash");

  const {
    preferences: { type, time, isOpen },
  } = usePreferenceContext();

  const [list, setList] = React.useState(() => shuffleList(type));
  const text = list.join(" ")
  const {
    states,
    actions: { insertTyping, deleteTyping, resetTyping, endTyping },
  } = useTyping(text, { skipCurrentWordOnSpace: false, pauseOnError: true });

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (isOpen) return;
      if (event.key === "tab") {
        buttonRef.current.focus();
      } else if (event.key !== "Enter") {
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  React.useEffect(() => {
    setList(shuffleList(type));
  }, [type]);

  const inputRef = React.useRef();
  const buttonRef = React.useRef();

  return (
    <>
      {/* Box */}
      <TypingInput
        ref={inputRef}
        text={text}
        time={time}
        insertTyping={insertTyping}
        deleteTyping={deleteTyping}
        endTyping={endTyping}
        resetTyping={resetTyping}
        states={states}
      />

      {/* Restart Button */}
      <button
        onClick={() => {
          inputRef.current.focus();
          setList(shuffleList(type));
          resetTyping();
        }}
        ref={buttonRef}
        tabIndex={2}
        className="group relative z-40 mt-2 flex items-center rounded-lg border-0 px-4 py-2 text-fg/50 outline-none transition-colors duration-200 hover:text-fg focus:bg-hl focus:text-bg active:bg-hl active:text-bg"
      >
        <VscDebugRestart className="scale-x-[-1] transform text-2xl" />
        <Tooltip className="top-12 font-primary group-hover:translate-y-0 group-hover:opacity-100 group-focus:top-14 group-focus:translate-y-0 group-focus:opacity-100 group-active:top-14 group-active:translate-y-0 group-active:opacity-100">
          Restart Test
        </Tooltip>
      </button>
    </>
  );
}
