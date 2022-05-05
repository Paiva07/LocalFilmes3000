import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../api';
import Button from '../Components/Button';
import Input from '../Components/Input';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [dados, setDados] = React.useState(null);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  async function loginAccount(email, password) {
    const { url, options } = LOGIN_USER({
      email: email,
      senha: password,
    });
    const response = await fetch(url, options);
    const json = await response.json();

    if (response.status === 200) {
      const { token } = await json;
      window.localStorage.setItem('token', token);
      navigate('/home');
    } else {
      setError(json.msg);
    }
  }

  return (
    <div className={`animeLeft ${styles.modal}`}>
      <div className={styles.loginLeft}></div>
      <div className={styles.loginRight}>
        <div className={styles.container}>
          {' '}
          <h1>Sign In</h1>
          <Input
            type="email"
            id="login"
            placeholder="Email"
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            type="password"
            id="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          {error && <p>{error}</p>}
          <Button
            text="Sign In"
            onClick={() => loginAccount(email, password)}
          />
          <p>
            New Here? <NavLink to="create">Create an Account</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
