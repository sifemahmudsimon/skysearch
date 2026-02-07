// services/debounceService.ts
import { useMemo, useEffect } from "react";
import { debounce } from "lodash";

/**
 * Simple debounce hook
 * @param callback function to debounce
 * @param delay debounce time in ms (default 300)
 */
export const useDebouncedCallback = (callback: (...args: any[]) => void, delay: number = 300) => {
    // memoize the debounced function
    const debounced = useMemo(() => debounce(callback, delay), [callback, delay]);

    // cleanup on unmount
    useEffect(() => {
        return () => {
            debounced.cancel();
        };
    }, [debounced]);

    return debounced;
};
