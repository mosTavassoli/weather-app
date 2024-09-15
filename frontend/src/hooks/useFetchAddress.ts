import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { getLocation } from "../api/apis";
import { LocationData } from "../types/types";

export const useFetchAddress = () => {
  const [suggestedAddress, setSuggestedAddress] = useState<LocationData[]>([]);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFetchRef = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    debouncedFetchRef.current = debounce(async (data: string) => {
      setIsLoading(true);
      try {
        const result = await getLocation(data);
        setSuggestedAddress(result);
      } catch (error: unknown) {
        setAddressError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setSuggestedAddress([]);
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      debouncedFetchRef.current?.cancel();
    };
  }, []);

  const debounceFetchAddress = useCallback((data: string) => {
    debouncedFetchRef.current?.(data);
  }, []);

  return {
    suggestedAddress,
    addressError,
    setAddressError,
    debounceFetchAddress,
    setSuggestedAddress,
    isLoading,
    setIsLoading,
  };
};
