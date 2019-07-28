import { NextPage } from 'next';
import { LoginForm } from './components/Form'

const LoginPage: NextPage<{}> = () => {
    return (
        <div>
            <header>Login Page</header>
            <LoginForm />
        </div>
    )
}

export default LoginPage
