<?php

        $name=$_REQUEST['name'];
        $phone=$_REQUEST['phone'];
     //   $user=M('choujiang')->where('c_phone="'.$phone.'"')->find();
       // status 0 c抽奖次数用完  1 正常数据 2 插入异常
	 
//        if(empty($user)){
//            $data['c_phone']=$phone;
//            $data['c_name']=$name;
//            $data['c_createtime']=time();
//            $res=M('choujiang')->add($data);
//        }
//        if($user['c_times']>=2){
//           $result['status']='0';
//        }else{
//              $result['status']='1';
//              $result['phone']=$phone;
//       }
//         $this->ajaxReturn($result);
       $result['status']='1'; 
	   $result['phone']=$phone;
        echo   json_encode($result);  

?>
