import {useDispatch,useSelector} from 'react-redux'
import { Form, Input, Button,message } from 'antd';
import {Login as loginApi} from '../../api/login'
import {useNavigate} from 'react-router-dom'
import {StorelistType} from '../../store/index'
import {setUser} from '../../store/userSlice';

function Login(){
    const userInfo = useSelector((state:StorelistType)=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        loginApi(values).then(res=>{
            if(res.data.code === 200){
                dispatch(setUser({userInfo:res.data.data}));
                message.warning(res.data.message);
                setTimeout(()=>{
                    navigate('/home');
                })
                
            }
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
            </Form>
        </div>
    )
}


export default Login;