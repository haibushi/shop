import axios from '../lib/axios';
import type {AxiosPromise} from 'axios'

interface Service{
    code:number,
    data:string | null | number | any[],
    message:string
}
export function Login (data:{username:string,password:string}):AxiosPromise<Service>{
    // post
    // return axios({
    //     method:"post",
    //     url:"/login/index",
    //     data
    //    })
    //get
    return axios({
        method:"get",
        url:"/login/index",
        params:data
       })
    
}