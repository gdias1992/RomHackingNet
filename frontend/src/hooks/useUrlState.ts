import * as React from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Sync state with URL search params.
 */
export function useUrlState<T extends Record<string, string | number | undefined>>(
  defaultValues: T
): [T, (updates: Partial<T>) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = React.useMemo(() => {
    const result = { ...defaultValues } as T;
    for (const key of Object.keys(defaultValues)) {
      const value = searchParams.get(key);
      if (value !== null) {
        const defaultVal = defaultValues[key];
        if (typeof defaultVal === "number") {
          const parsed = parseInt(value, 10);
          if (!isNaN(parsed)) {
            (result as Record<string, unknown>)[key] = parsed;
          }
        } else {
          (result as Record<string, unknown>)[key] = value;
        }
      }
    }
    return result;
  }, [searchParams, defaultValues]);

  const setState = React.useCallback(
    (updates: Partial<T>) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(updates)) {
          if (value === undefined || value === "" || value === defaultValues[key]) {
            newParams.delete(key);
          } else {
            newParams.set(key, String(value));
          }
        }
        return newParams;
      });
    },
    [setSearchParams, defaultValues]
  );

  return [state, setState];
}
