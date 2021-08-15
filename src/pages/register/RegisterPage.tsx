import React from 'react';
import {UserLayout} from '@/layouts';
import RegisterForm from './RegisterForm';


const RegisterPage: React.FC = () => {
    return <UserLayout>
        <RegisterForm />
    </UserLayout>;

}

export default RegisterPage;
