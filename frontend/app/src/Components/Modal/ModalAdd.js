import React from 'react';
import { POST_FILM } from '../../api';
import Button from '../Button';
import Input from '../Input';
import styles from './ModalAdd.module.css';

const ModalAdd = ({ modalAdd, setModalAdd, dados, setDados }) => {
  const [nome, setNome] = React.useState(null);
  const [genero, setGenero] = React.useState(null);
  const [duracao, setDuracao] = React.useState(null);
  const [foto, setFoto] = React.useState(null);

  async function addFilm(nome, genero, foto, duracao) {
    const { url, options } = POST_FILM({ nome, genero, foto, duracao });
    const response = await fetch(url, options);
    const json = await response.json();
    setDados([...dados, json]);
    setModalAdd(!modalAdd);
  }
  return (
    <div className={styles.containerBackGround}>
      <div className={styles.container}>
        <div className={styles.containerAux}></div>
        <div>
          <Input
            type="text"
            placeholder="Filme"
            onChange={({ target }) => setNome(target.value)}
          />
          <Input
            type="text"
            placeholder="Genero"
            onChange={({ target }) => setGenero(target.value)}
          />
          <Input
            type="text"
            placeholder="Foto"
            onChange={({ target }) => setFoto(target.value)}
          />
          <Input
            type="text"
            placeholder="Duração"
            onChange={({ target }) => setDuracao(target.value)}
          />

          <Button
            text="Finish"
            onClick={() => addFilm(nome, genero, foto, duracao)}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
