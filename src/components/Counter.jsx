import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleDecrease() {
    setCount((num) => num - 1);
  }
  function handleIncrease() {
    setCount((num) => num + 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <div>
      <button onClick={handleDecrease} disabled={count <= 0}>
        -
      </button>
      <span>{count}</span>
      <button onClick={handleIncrease}>+</button>

      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
