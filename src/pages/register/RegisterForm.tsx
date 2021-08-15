import React from 'react';
import styles from './RegisterForm.module.less';
import {Form,  Input, Button, Checkbox} from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
};

const tailLayout =  {
    wrapperCol: {offset: 8, span: 16}
};

const RegisterForm = () => {
    const history = useHistory();
    const onFinish = async (values: any) => {
        try {
            console.log("Success:", values);
            await axios.post('/api/register', {
                username: values.username,
                password: values.password,
                confirmPassword: values.confirmPassword
            });
            history.push('/signIn');
        } catch (e) {
            alert('注册失败！');
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            {...layout}
            name='basic'
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles.registerForm}
        >
            <Form.Item
                label='UserName'
                name='username'
                rules={[{required: true, message: 'Please input your username！'}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Password'
                name='password'
                rules={[{required: true, message: 'Please input your pasword!'}]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label='Confirm Password'
                name='confirm'
                hasFeedback={true}
                rules={[
                    {required: true, message: 'Please input your confirm password!'},
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('密码确认不一致！')
                        }
                    })
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                {...tailLayout}
                name='remember'
                valuePropName='checked'
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
