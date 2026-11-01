
import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  // useEffect to fetch request
  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({
          data: null,
          loading: true,
          error: null,
        });

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result: T = await response.json();

        setState({
          data: result,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Something went wrong",
        });
      }
    };

    fetchData();
  }, [url]);

  return state;
}
