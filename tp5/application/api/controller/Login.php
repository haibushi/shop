<?php
namespace app\api\controller;
use think\Db;
use  think\Request;
class Login extends Common
{	
    public function index()
    {
		$username = Request::instance()->param('username');
		$password = Request::instance()->param('password');
		$where['username'] = $username; 
		$res = Db::table('admin')->where($where)->find();
		if(!$res){
			return $this->setError('用户名不存在');
		}
		if($res['password'] == md5($password)){
			return $this->setData($res,'登入成功');
		}else{
			return $this->setError('密码错误');
		}
		
		
	}
	
}
