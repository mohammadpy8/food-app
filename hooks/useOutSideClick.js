import { useEffect } from "react";

const useOutsideClick = (ref, exeptionId, changeSetOptions) => {
  useEffect(() => {
    const handelOutsideClick = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exeptionId
      ) {
        changeSetOptions();
      }
    }; 

    document.addEventListener("mousedown", handelOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handelOutsideClick);
    };
  }, [ref, changeSetOptions]);
};

export default useOutsideClick;