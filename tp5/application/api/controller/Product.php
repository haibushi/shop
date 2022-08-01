<?php
namespace app\api\controller;
use think\Db;
use  think\Request;
class Product extends Common
{	
	
    public function index()
    {
		$list = Db::table('product')->select();
		foreach ($list as $key => $value) {
			$list[$key]['create_time'] = date('Y-m-d',$value['create_at']);
		}
		return $this->setData($list,'数据获取成功');
	}
	
	public function add()
    {
		$data['product_name'] = Request::instance()->param('product_name');
		$data['product_price'] = Request::instance()->param('product_price');
		$data['product_url'] = Request::instance()->param('product_url');
		$data['category_id'] = Request::instance()->param('category_id');
		$data['is_top'] = Request::instance()->param('is_top');
		$data['is_tuijian'] = Request::instance()->param('is_tuijian');
		$data['sort'] = Request::instance()->param('sort');
		$data['create_at'] = time();
		$data['update_at'] = time();
		$res = Db::table('product')->insert($data);
		return $this->setData($res,'操作成功');
	}
	
	public function del(){
		$id = Request::instance()->param('id');
		$where['id'] = $id;
		$res = Db::table('product')->where($where)->delete();
		return $this->setData($res,'操作成功');
	}
	
	public function find(){
		$id = Request::instance()->param('id');
		$where['id'] = $id;
		$res = Db::table('product')->where($where)->find();
		return $this->setData($res,'操作成功');
	}
	
	public function update(){
		$id = Request::instance()->param('id');
		$where['id'] = $id;
		$data['product_name'] = Request::instance()->param('product_name');
		$data['product_price'] = Request::instance()->param('product_price');
		$data['product_url'] = Request::instance()->param('product_url');
		$data['category_id'] = Request::instance()->param('category_id');
		$data['is_top'] = Request::instance()->param('is_top');
		$data['is_tuijian'] = Request::instance()->param('is_tuijian');
		$data['sort'] = Request::instance()->param('sort');
		$data['update_at'] = time();
		$res = Db::table('product')->where($where)->update($data);
		return $this->setData($res,'操作成功');
	}
	
	
	public function deleteAll(){
		$ids = Request::instance()->param('ids');
		$where['id'] = ['in',$ids];
		$res = Db::table('product')->where($where)->delete();
		return $this->setData($res,'操作成功');
	}
}
