import { useState } from 'react';

const Counter = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  const handleInputChange = (event) => {
    const newCount = parseInt(event.target.value, 10);
    if (!isNaN(newCount)) {
      setCount(newCount);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-col items-center">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mb-2"
          onClick={increment}
        >
          +
        </button>
        <input
          type="number"
          className="text-4xl font-bold text-center w-12 p-1 border border-gray-300"
          value={count}
          onChange={handleInputChange}
        />
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-full mt-2"
          onClick={decrement}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
