import {
  increamentNumber,
  decreamentNumber,
  resetNumber,
} from "@/features/users/numberSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Number = () => {
  const dispatch = useDispatch();
  const numberValue = useSelector((state) => state.number);

  console.log(numberValue.message);

  const [dataReducer, setDataReducer] = useState({
    increament: "",
    decereamnt: "",
    messageIn: "",
    messageDe: "",
  });

  const changeHandler = (e) => {
    setDataReducer({
      ...dataReducer,
      [e.target.name]: e.target.value,
    });
  };

  console.log(dataReducer);

  return (
    <div>
      <div>
        <input
          name="increament"
          placeholder="increament"
          value={dataReducer.increament}
          onChange={changeHandler}
        />
        <input
          name="decereamnt"
          placeholder="decreament"
          value={dataReducer.decereamnt}
          onChange={changeHandler}
        />
        <input
          name="messageIn"
          placeholder="messageIn"
          value={dataReducer.messageIn}
          onChange={changeHandler}
        />
        <input
          name="messageDe"
          placeholder="messageDe"
          value={dataReducer.messageDe}
          onChange={changeHandler}
        />
      </div>
      <div>
        <button
          onClick={() =>
            dispatch(increamentNumber(+dataReducer.increament, "increament"))
          }
        >
          plus number
        </button>
        <button
          onClick={() =>
            dispatch(decreamentNumber(+dataReducer.increament, "increament"))
          }
        >
          mines number
        </button>{" "}
        <button onClick={() => dispatch(resetNumber())}>reset number</button>
      </div>

      <div>
        <h1>number value: {numberValue.number}</h1>
        <h1>message: {numberValue.message}</h1>
      </div>
    </div>
  );
};

export default Number;
