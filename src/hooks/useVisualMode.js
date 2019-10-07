import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace === false) {
      history.push(newMode)
      setMode(newMode)
      return { mode };
    } else if (replace === true) {
      history.pop()
      history.push(newMode)
      setMode(newMode)
      return { mode };
    }

  }

  function back() {
    history.pop()
    setMode(history[history.length - 1])
    return { mode };
  }

  return { mode, transition, back };
}