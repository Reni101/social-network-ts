import React from 'react';
import LoginReduxForm, {FormDataLoginType} from "./LoginForm";

const LoginPage = () => {
    const onSubmit =(formData:FormDataLoginType)=>{
        console.log(formData)
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

export default LoginPage;