import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './CreateAccount.module.css';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { POST_USER } from '../api';

const CreateAccount = () => {
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  async function createAccount(nome, email, senha) {
    const { url, options } = POST_USER({
      nome: nome,
      email: email,
      senha: senha,
    });
    const response = await fetch(url, options);
    const json = await response.json();

    if (response.status === 201) {
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
          <h1>Sign Up</h1>
          <Input
            type="text"
            id="User"
            placeholder="User"
            onChange={({ target }) => setNome(target.value)}
          />
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
            onChange={({ target }) => setSenha(target.value)}
          />
          {error && <p>{error}</p>}
          <Button
            text="Sign Up"
            onClick={() => createAccount(nome, email, senha)}
          />
          <p>
            Do you have Account? <NavLink to="/">Sign In</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
