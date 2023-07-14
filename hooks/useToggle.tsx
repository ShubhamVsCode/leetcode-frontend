import { useState } from "react";

const useToggle = (values: string[]) => {
  const [toggleValue, setToggleValue] = useState(values[0]);

  const toggle = () => {
    setToggleValue((prevValue) =>
      prevValue === values[0] ? values[1] : values[0]
    );
  };

  return { toggleValue, toggle };
};

export default useToggle;
