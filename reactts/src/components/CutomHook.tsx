import React, { useState, useEffect } from "react";

// 1. Define the User data structure
interface User {
  id: number;
  name: string;
  email: string;
}

// 2. Generic custom hook implementation for useFetch
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = (await response.json()) as T;
        setData(json);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        } else if (!(err instanceof Error)) {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

// 3. Component consuming the custom hook
const CustomHook: React.FC = () => {
  const { data, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <div>
      <h2>User Directory</h2>

      {loading && <p>Loading users...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {data?.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> &mdash; {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomHook;