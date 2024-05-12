import { useRef } from "react";

export function useLoginController() {
  const inputRef = useRef<HTMLInputElement>(null);

  return {
    inputRef
  }
}
