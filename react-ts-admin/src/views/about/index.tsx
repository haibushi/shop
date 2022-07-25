// import About1 from "./about1";
// import { useState, useMemo } from "react";
// function About() {
//   const [num, setNum] = useState(0);
//   console.log("index/About");
//   const about1 = useMemo(() => <About1 num={num} />, []);
//   const handle = () => {
//     setNum(num + 1);
//   };
//   return (
//     <div>
//       About
//       <button onClick={handle}>{num}</button>
//       {about1}
//     </div>
//   );
// }

// export default About;

import { useEffect, useState } from "react";

function About() {
  let [a, setA] = useState(1);
  useEffect(() => {
    setA(2);
    debugger;
    console.log("effect");
  }, []);
  console.log(123);

  return <button>{a}</button>;
}

export default About;
