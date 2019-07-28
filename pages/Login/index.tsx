import { NextPage } from 'next';
import { LoginForm } from './components/Form'

const LoginPage: NextPage<{}> = () => {
    return (
        <div>
            <head>Login Page</head>
            <LoginForm />
        </div>
    )
}

export default LoginPage
