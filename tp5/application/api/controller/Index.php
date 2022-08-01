<?php
namespace app\api\controller;
use think\Db;
class Index extends Common
{	
	
    public function index()
    {
		$res = Db::table('admin')->select();
		dump($res);
		return 123;
	}
	
	
}
