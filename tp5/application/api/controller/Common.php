<?php
namespace app\api\controller;
use think\Request;
use think\Db;
use think\Controller;
class Common extends Controller
{	
	public function constructor(){
		header('Access-Control-Allow-Origin:*');
	}
  
  public function setData($list,$msg){
	  $data = [
		'code'=>200,
		'data'=>$list,
		'message'=>$msg
	  ];
	  return json_encode($data);
  }
  
  public function uploadFile(){
	// 获取表单上传文件 例如上传了001.jpg
    $file = request()->file('file');
    // 移动到框架应用根目录/public/uploads/ 目录下
    if($file){
        $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
        if($info){
            //echo $info->getSaveName();
            //echo $info->getFilename();
			$data = [
				'data'=>$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/tp5'.'/public/uploads/'.$info->getSaveName(),
				'code'=>200,
				'message'=>'上传成功'];
			echo json_encode($data);
			//return json_encode($data);
			
        }else{
            // 上传失败获取错误信息
            echo $file->getError();
        }
    }
  }
  
  public function setError($msg){
	  $data = [
		'code'=>201,
		'message'=>$msg
	  ];
	  return json_encode($data);
  }
	
}
