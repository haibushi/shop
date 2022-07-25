import About2 from "./about2";
import { useState } from "react";
interface propsType {
  num: number;
}
function About1(props: propsType) {
  const info = {
    num: props.num,
  };
  const [numInfo, setNumInfo] = useState(info);

  console.log("About1", numInfo.num);

  const handle = () => {
    setNumInfo({
      ...numInfo,
      num: numInfo.num + 1,
    });
  };
  return (
    <div>
      {numInfo.num}
      <button onClick={handle}>{numInfo.num}</button>
      <About2></About2>
    </div>
  );
}

export default About1;
