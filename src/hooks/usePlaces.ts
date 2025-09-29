import { useEffect, useState } from "react";
import { fetchPlaces } from "../contentful/api";
import { mapCFPlaceToUI } from "../contentful/mapper";
import type { Place as UIPlace } from "../types";

type State = { data: UIPlace[] | null; loading: boolean; error: Error | null };

export function usePlaces(): State {
  const [state, setState] = useState<State>({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cfItems = await fetchPlaces();
        const mapped = cfItems
          .map(mapCFPlaceToUI)
          .filter((x): x is UIPlace => !!x && typeof x.lat === "number" && typeof x.lng === "number");
        if (!cancelled) setState({ data: mapped, loading: false, error: null });
      } catch (e: any) {
        if (!cancelled) setState({ data: null, loading: false, error: e });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return state;
}
