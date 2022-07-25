import { useSelector } from "react-redux";
import classnames from "classnames";
import { useState, useEffect } from "react";

function Home() {
  const { userInfo } = useSelector((state: any) => state.user);
  const [count, setCount] = useState(0);

  function handleAlertClick() {}

  return (
    <div className={classnames({ aa: true })}>
      欢迎回来{userInfo.username}
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
}

export default Home;
