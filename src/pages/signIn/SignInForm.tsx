import React, {useEffect} from 'react';
import styles from './SignInForm.module.less';
import {Form, Input, Button, Checkbox} from 'antd';
import {useDispatch} from 'react-redux';
import {useSelector} from '@/redux/hooks';
import {signIn} from '@/redux/user/slice';
import {useHistory, useLocation} from 'react-router-dom';

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16}
};

const SignInForm: React.FC = () => {
    const loading = useSelector(state => state.user.loading);
    const jwt = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<{ to: string }>();
    const path = location.state && location.state.to || '/'

    useEffect(() => {
        if (jwt !== null) {
            history.push(path);
        }
    }, [jwt, history, path]);

    const onFinish = (values: any) => {
        console.log("Success:", values);
        dispatch(signIn({
            account: values.username,
            password: values.password
        }));
    };

    const onFinishFailed = (error) => {
        console.log("Failed:", error);
    }

    return (
        <Form
            {...layout}
            name='basic'
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles.signInForm}
        >
            <Form.Item
                label='Username'
                name='username'
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Password'
                name='password'
                rules={[{required: true, message: "Please input your password!"}]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit' loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignInForm;
