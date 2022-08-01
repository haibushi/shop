### react  useContext

  useContext 就是上下文   全局变量就是上下文 ;  上下文就是你运行一段代码  所要知道的所有变量

涉及到的API 包含 createContext  useContext

使用方式

1 创建createContext

```
const Context = createContext(null);
```

2 Provide 指定使用的范围

```
<Context.provide value={{val,setVal}}>
	<Father />
</Context.provide>
```

3 使用useContext

   使用useContext接收上下文   因为传入的是一个对象   所以接收的也应该是一个对象

```
const {val,setVal} = useContext(Context)
```

4 完整的案例jsx

```
// index.jsx
import React,{createContext,useState} from 'react';
import Father from './Father.';
export const Context = createContext(null);
const Index = ()=>{
	const [val,setVal] = useState(0)
	return <>
		<Context.provide value={{val.setVal}}>
			<Father />
		</Context.provide>
	</>
}

//Father.jsx
import {Context} from './index.jsx';
import {useContext} from 'react';
const Index = ()=>{
	const [val] = useContext(Context);
	return <>
			Father{val}
			<Child />
	</>
}

//Child.jsx
import {Context} from './index.jsx';
import {useContext} from 'react';
const Index = ()=>{
	const [val] = useContext(Context);
	return <>
			<button onClick={()=>setVal((val)=>val+1)}>{val}</button>
	</>
}


```

4 完整的案例tsx

```
// index.tsx

import {
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useState
} from "react";
import Father from "./Father";
export interface ContextType {
  val: number;
  setVal: Dispatch<SetStateAction<number>>;
}
export const Context = createContext<null | ContextType>(null);
const Index = () => {
  const [val, setVal] = useState<number>(1);
  return (
    <>
      <Context.Provider value={{ val, setVal }}>
        <Father />
      </Context.Provider>
    </>
  );
};

//father.tsx
import Child from "./Child";
import { Context } from "./test";
import type { ContextType } from "./test";
import { useContext } from "react";
const Father = () => {
  const { val } = useContext(Context) as ContextType;
  return (
    <>
      Father{val}
      <Child></Child>
    </>
  );
};
export default Father;

//Child.tsx
import { Context } from "./test";
import type { ContextType } from "./test";
import { useContext } from "react";
const Child = () => {
  const { val, setVal } = useContext(Context) as ContextType;
  return (
    <>
      Child
      <button onClick={() => setVal((val: number) => val + 1)}>{val}</button>
    </>
  );
};
export default Child;


```

