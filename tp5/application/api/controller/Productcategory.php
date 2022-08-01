<?php
namespace app\api\controller;
use think\Db;
use  think\Request;
class Productcategory extends Common
{	
	
    public function index()
    {
		$list = Db::table('product_category')->select();
		foreach ($list as $key => $value) {
			$list[$key]['create_time'] = date('Y-m-d',$value['create_at']);
		}
		return $this->setData($list,'数据获取成功');
	}
	
	public function add()
    {
		$name = Request::instance()->param('name');
		$sort = Request::instance()->param('sort');
		$data['name'] = $name;
		$data['sort'] = $sort;
		$data['create_at'] = time();
		$res = Db::table('product_category')->insert($data);
		return $this->setData($res,'操作成功');
	}
	
	public function del(){
		$id = Request::instance()->param('id');
		$where['id'] = $id;
		$res = Db::table('product_category')->where($where)->delete();
		return $this->setData($res,'操作成功');
	}
	
	public function find(){
		$id = Request::instance()->param('id');
		$where['id'] = $id;
		$res = Db::table('product_category')->where($where)->find();
		return $this->setData($res,'操作成功');
	}
	
	public function update(){
		$id = Request::instance()->param('id');
		$where['id'] = $id;
		$data = [
			'name'=> Request::instance()->param('name'),
			'sort'=> Request::instance()->param('sort'),
		];
		$res = Db::table('product_category')->where($where)->update($data);
		return $this->setData($res,'操作成功');
	}
	
	
	public function deleteAll(){
		$ids = Request::instance()->param('ids');
		$where['id'] = ['in',$ids];
		$res = Db::table('product_category')->where($where)->delete();
		return $this->setData($res,'操作成功');
	}
}
