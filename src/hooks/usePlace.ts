import { useEffect, useState } from "react";
import { fetchPlaceBySlug } from "../contentful/api";
import { mapCFPlaceToUI } from "../contentful/mapper";
import type { Place as UIPlace } from "../types";

type State = { data: UIPlace | null; loading: boolean; error: Error | null };

export function usePlace(slug?: string): State {
  const [state, setState] = useState<State>({ data: null, loading: true, error: null });

  useEffect(() => {
    if (!slug) {
      setState(s => ({ ...s, loading: false, error: new Error("Missing slug") }));
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const cf = await fetchPlaceBySlug(slug);
        const mapped = cf ? mapCFPlaceToUI(cf) : null;
        if (!cancelled) setState({ data: mapped, loading: false, error: null });
      } catch (e: any) {
        if (!cancelled) setState({ data: null, loading: false, error: e });
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  return state;
}
