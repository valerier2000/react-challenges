import { useEffect, useState } from "react";

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    if (value.length > 0) localStorage.setItem(key, JSON.stringify(value));
    else localStorage.removeItem(key);
  }, [key, value]);

  return [value, setValue];
}
