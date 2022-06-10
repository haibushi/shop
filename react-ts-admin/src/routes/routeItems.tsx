import React from "react"
import About from "../views/about";
import Readme from "../views/readMe";
import Carousel from '../views/Carousel'
import Home from "../views/home";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
export interface RouteItemType{
    path: string,
    icon?: Function | string,
    label: string,
    meta?: {
        hidden?:boolean,
    },
    component: React.ReactNode,
    children?:Array<RouteItemType>
}

const routeItems: Array<RouteItemType> = [
    {
      path: '/home',
      icon: UserOutlined,
      label: '首页',
      meta: {
        hidden:true
      },
      component: <Home />,
    },
    {
      path: '/test',
      icon: LaptopOutlined,
      label: '关于我们',
      component: <About />,
      children: [
        {
          path: '/test/table',
          label: '列表',
          component:  <About />,
        },
      ],
    },
    {
      path: '/readMe',
      icon: NotificationOutlined,
      label: '轮播图管理',
      component: <Carousel />,
    }
  ]
  
  export default routeItems