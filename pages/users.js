import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/features/counter/counterSlice";

const Users = () => {
  const [counterPlus, setCounterPlus] = useState("");
  const [counterMines, setCounterMines] = useState("");

  const counter = useSelector((state) => state.counter.counterValue);
  console.log(counter);
  const dispatch = useDispatch();

  return (
    <div>
      <input
        value={counterPlus}
        placeholder="plus"
        onChange={(e) => setCounterPlus(e.target.value)}
      />
      <input
        value={counterMines}
        placeholder="mines"
        onChange={(e) => setCounterMines(e.target.value)}
      />
      <button onClick={() => dispatch(increment(+counterPlus))}>plus</button>
      <button onClick={() => dispatch(decrement(+counterMines))}>mines</button>
      <h1>{counter}</h1>
    </div>
  );
};

export default Users;
