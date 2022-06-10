import {useSelector} from 'react-redux'
import classnames from 'classnames';
import { useState,useEffect } from 'react';

function Home(){
    const {userInfo} = useSelector((state:any)=>state.user);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        setTimeout(()=>{
            alert(count)
        },1000);
    },[count])

    function handleAlertClick() {
    }

    return (
        <div className={classnames({'aa':true})}>欢迎回来{userInfo.username}
            <p>You clicked {count} times</p>
            <button 
                onClick={() => setCount(count + 1)}
            >
                Click me
            </button>
            <button onClick={handleAlertClick}>
                Show alert
            </button>

            <div><h3>123</h3><p>456</p><span>789</span></div>
        </div>
    )
}


export default Home;