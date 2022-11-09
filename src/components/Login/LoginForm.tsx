import React from 'react';
import {useFormik} from 'formik';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
type PropsType ={
    Login: (login: string, password: string, rememberMe: boolean) => void
}

const LoginForm = (props:PropsType) => {
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            rememberMe: true,
        },
        onSubmit: values => {
           props.Login(values.login,values.password,values.rememberMe)
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>Login</div>
            <input
                name="login"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.login}
            />
            <div>Password</div>
            <input
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <div>Remember Me</div>
            <input
                type="checkbox"
                name="rememberMe"
                onChange={formik.handleChange}
                checked={formik.values.rememberMe}
            />
            <button type="submit">Login</button>

        </form>
    );
};

export default LoginForm;