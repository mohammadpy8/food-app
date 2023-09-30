import axios from "axios";
import { useRef, useImperativeHandle, forwardRef, useState } from "react";

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  console.log(inputRef);

  useImperativeHandle(ref, () => ({
    select: () => {
      inputRef.current.select();
    },
    focus: () => {
      inputRef.current.focus();
    },

  }));
  console.log(inputRef.current);

  return <input ref={inputRef} {...props} />;
});

// Some other component that uses our CustomInput component
const Ref = () => {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [getData, setGetData] = useState(null);

  const body = {
    name: "", 
    userName: "",
    email:""
  };

  console.log(inputRef.current);

  const focusInput = () => {
    inputRef.current.focus();
    // ^ This will throw an error ❌
  };

  const selectText = () => {
    inputRef.current.select();
    ;
  };

  const resetHnadler = () => {
    setValue("");
    const sendData = axios.post("localhost:4000/data", {
        body: JSON.stringify(body),
        Headers: {
            
        }
    })
  }

  return (
    <div>
      <CustomInput
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={focusInput}>Focus Input</button>
      <button onClick={selectText}>Select text in input</button>
      <button onClick={resetHnadler}>send and reset</button>
    </div>
  );
};

export default Ref;
