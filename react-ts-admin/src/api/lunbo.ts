import axios from '../lib/axios';
import type {AxiosPromise} from 'axios'
import React from 'react';

interface Service{
    code:number,
    data:any,
    message:string
}

interface AddLunboType {
    photo:string,
    link:string,
    sort:number

}

export function addLunbo (data:AddLunboType):AxiosPromise<Service>{
    // post
    return axios({
        method:"post",
        url:"/lunbo/add",
        data
    })
}

export function listLunbo (data:any = {}):AxiosPromise<Service>{
    // get
    return axios({
        method:"get",
        url:"/lunbo/index",
        params:data
    })
}

export function deleteLunbo (data:{id:number}):AxiosPromise<Service>{
    // get
    return axios({
        method:"get",
        url:"/lunbo/del",
        params:data
    })
}

export function find(data:{id:number}):AxiosPromise<Service>{
    return axios({
        method:"get",
        url:"/lunbo/find",
        params:data
    }) 
}


export function update (id:number ,data:AddLunboType):AxiosPromise<Service>{
    // post
    return axios({
        method:"post",
        url:"/lunbo/update/?id="+id,
        data
    })
}

export function deleteAll (data:{ids:string}):AxiosPromise<Service>{
    // post
    return axios({
        method:"post",
        url:"/lunbo/deleteAll",
        params:data
    })
}