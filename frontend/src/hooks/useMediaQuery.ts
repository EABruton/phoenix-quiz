import { useState, useEffect } from "react";

export default function useMediaQuery(query: string): boolean {
  // initial load -> check if window matches query
  const [matchesQuery, setMatchesQuery] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  // keep track of whether there's a match on change & update
  // the state accordingly
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatchesQuery(event.matches);
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };

    // only run this again if the query changes
  }, [query]);

  return matchesQuery;
}
