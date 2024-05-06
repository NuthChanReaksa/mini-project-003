import React from 'react';
import Container from "@/components/Container";
import FormWrap from '@/components/FormWrap';
import LoginForm from "@/app/(auth)/login/LoginForm";

const Login = () => {
    return (
        <Container>
            <FormWrap>
                    <LoginForm />
            </FormWrap>
        </Container>
    );
};

export default Login;