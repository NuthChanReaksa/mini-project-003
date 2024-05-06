import React from 'react';
import FormWrap from "@/components/FormWrap";
import Container from "@/components/Container";
import RegisterForm from "@/app/(auth)/register/RegisterForm";

const Register = () => {
    return (
        <Container>
            <FormWrap>
                <RegisterForm/>
            </FormWrap>
        </Container>
    );
};

export default Register;