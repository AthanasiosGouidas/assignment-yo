import { useState, useEffect } from "react";

// This custom hook abstracts the pattern of fetching data, managing the loading state,
// and handling errors. By passing a fetch function, components can use this hook to manage
// any asynchronous data fetching needs.
export const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  errorHandler?: (error: string) => void
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchFunction();
        setData(fetchedData);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        if (errorHandler) {
          errorHandler(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, errorHandler]);

  return { data, loading, error };
};
