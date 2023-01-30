import React from 'react';
import {useFormik} from 'formik';

type FormikErrorType = {
    login?: string
    password?: string
    rememberMe?: boolean
    captcha?: string
}
type PropsType = {
    Login: (login: string, password: string, rememberMe: boolean, captcha?: string) => void
    captchaURl: string | null
}

const LoginForm = (props: PropsType) => {
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            rememberMe: true,
            captcha: "",
        },
        onSubmit: values => {
            props.Login(values.login, values.password, values.rememberMe, values.captcha)
            formik.resetForm()
        },

        validate: (values: FormikErrorType) => {
            const errors: FormikErrorType = {}
            if (!values.login) {
                errors.login = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)) {
                errors.login = 'Invalid email address'
            }


            if (!values.password) {
                errors.password = "Required"
            } else if (values.password.length < 3) {
                errors.password = `password must be at least ${3} characters long `
            }
            return errors
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
            {formik.touched.login && formik.errors.login &&
                <div style={{color: "red"}}>{formik.errors.login}</div>}

            <div>Password</div>
            <input
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password &&
                <div style={{color: "red"}}>{formik.errors.password}</div>}

            <div>Remember Me</div>
            <input
                type="checkbox"
                name="rememberMe"
                onChange={formik.handleChange}
                checked={formik.values.rememberMe}
            />


            {props.captchaURl && <div><img src={props.captchaURl} alt="captcha"/></div>}
            {props.captchaURl && <input
                placeholder="enter the captcha"
                type="text"
                name="captcha"
                onChange={formik.handleChange}
                value={formik.values.captcha}
            />}
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default LoginForm;