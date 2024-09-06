import { useEffect, useState } from "react";

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = JSON.parse(localStorage.getItem(key));
      return storedValue ?? defaultValue;
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value && value.length !== 0)
      localStorage.setItem(key, JSON.stringify(value));
    else localStorage.removeItem(key);
  }, [key, value]);

  return [value, setValue];
}
