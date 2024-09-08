import {useState} from 'react'
import axios from 'axios'
import './Login.css'

const Login = ({ setAuthToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/auth/login', {email, password})
             .then(response => {
                 setAuthToken(response.data.token)
             })
             .catch(error => {
                 console.error('Login failed', error);
             });
    };

    return (
        <form className="loginForm" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <a href="/reset-password" className="forgot-password-link">Forget your password? Click here to reset</a>
            <hr />
            <button type="button" className="github-login-button">Click here to login with Github</button>
            <p>If you don't have an account <a href="/register">click here for register</a></p>
            <button type="submit" className="login-button">Login</button>
        </form>
    )
}

export default Login