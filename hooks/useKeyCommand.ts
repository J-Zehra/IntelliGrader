import { useEffect, useRef } from "react";

export default function useKeyCommand() {
  const ref = useRef<HTMLButtonElement | null>(null);

  const keyDownHandler = (e: KeyboardEvent) => {
    // e.preventDefault();
    if (e.key === "Enter") {
      if (ref.current) ref.current.click();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return { ref };
}
