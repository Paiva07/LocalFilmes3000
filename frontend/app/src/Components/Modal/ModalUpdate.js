import React from 'react';
import { EDIT_FILMS, GET_FILM } from '../../api';
import Button from '../Button';
import Input from '../Input';
import styles from './ModalUpdate.module.css';

const ModaUpdate = ({
  infoUpdate,
  setModalUpdate,
  modalUpdate,
  dados,
  setDados,
}) => {
  const [nome, setNome] = React.useState(null);
  const [genero, setGenero] = React.useState(null);
  const [duracao, setDuracao] = React.useState(null);
  const [infoFilms, setInfoFilms] = React.useState(null);

  React.useEffect(() => {
    const { url, options } = GET_FILM(infoUpdate);
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => setInfoFilms(json));
  }, []);

  async function upDateFilm(infoUpdate, nome, genero, duracao) {
    const { url, options } = EDIT_FILMS(infoUpdate, {
      nome: nome,
      genero: genero,
      duracao: duracao,
    });
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => setDados([...dados, json]));
    setModalUpdate(!modalUpdate);
  }
  if (!infoFilms) return null;
  return (
    <div className={styles.containerBackGround}>
      <div className={styles.container}>
        <img src={infoFilms[0].foto} alt={infoFilms[0].foto} />
        <div className={styles.containerInput}>
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
            placeholder="Duração"
            onChange={({ target }) => setDuracao(target.value)}
          />
          <Button
            text="Finish"
            onClick={() => upDateFilm(infoUpdate, nome, genero, duracao)}
          />
        </div>
      </div>
    </div>
  );
};

export default ModaUpdate;
