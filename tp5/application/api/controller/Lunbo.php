<?php
namespace app\api\controller;
use think\Db;
use  think\Request;
class Lunbo extends Common
{	
	
    public function index()
    {
		$list = Db::table('lunbo')->select();
		foreach ($list as $key => $value) {
			$list[$key]['create_time'] = date('Y-m-d',$value['create_at']);
			//$list[$key]['photo'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/tp5'.$value['photo'];
		}
		return $this->setData($list,'数据获取成功');
	}
	
	public function add()
    {
		$photo = Request::instance()->param('photo');
		$link = Request::instance()->param('link');
		$sort = Request::instance()->param('sort');
		$data['photo'] = $photo;
		$data['link'] = $link;
		$data['sort'] = $sort;
		$data['create_at'] = time();
		$data['update_at'] = time();
		$res = Db::table('lunbo')->insert($data);
		return $this->setData($res,'操作成功');
	}
	
	public function del(){
		$id = Request::instance()->param('id');
		$where['id'] = $id;
		$res = Db::table('lunbo')->where($where)->delete();
		return $this->setData($res,'操作成功');
	}
	
	public function find(){
		$id = Request::instance()->param('id');
		$where['id'] = $id;
		$res = Db::table('lunbo')->where($where)->find();
		return $this->setData($res,'操作成功');
	}
	
	public function update(){
		$id = Request::instance()->param('id');
		$where['id'] = $id;
		$data = [
			'photo'=> Request::instance()->param('photo'),
			'link'=> Request::instance()->param('link'),
			'sort'=> Request::instance()->param('sort'),
			'update_at'=> time()
		];
		$res = Db::table('lunbo')->where($where)->update($data);
		return $this->setData($res,'操作成功');
	}
	
	
	public function deleteAll(){
		$ids = Request::instance()->param('ids');
		$where['id'] = ['in',$ids];
		$res = Db::table('lunbo')->where($where)->delete();
		return $this->setData($res,'操作成功');
	}
}
