import React from 'react';
import styles from './Home.module.css';
import { DELETE_FILM, GET_FILMS } from '../api';
import ButtonIcon from '../Components/ButtonIcon';
import { useNavigate } from 'react-router-dom';
import ModalAdd from '../Components/Modal/ModalAdd';
import ModalUpdate from '../Components/Modal/ModalUpdate';

export const Home = () => {
  const [dados, setDados] = React.useState(null);
  const [modalAdd, setModalAdd] = React.useState(false);
  const [modalUpdate, setModalUpdate] = React.useState(false);
  const [infoUpdate, setInfoUpdate] = React.useState(null);
  React.useEffect(() => {
    const { url, options } = GET_FILMS();
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => setDados(json));
  }, [dados]);

  const navigate = useNavigate();
  function goOut() {
    window.localStorage.clear();
    navigate('/');
  }
  function deleteFilm(id) {
    const { url, options } = DELETE_FILM(id);
    fetch(url, options).then((response) => response.json());
  }
  function openModal(id) {
    setInfoUpdate(id);
    setModalUpdate(!modalUpdate);
  }
  if (dados == null) return null;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.supContainer}></div>
        <div className={styles.containerNav}>
          <ButtonIcon text="Add Films" onClick={() => setModalAdd(!modalAdd)} />
          <ButtonIcon text="Exit" onClick={goOut} />
        </div>
        {modalAdd && (
          <ModalAdd
            setModalAdd={setModalAdd}
            modalAdd={modalAdd}
            dados={dados}
            setDados={setDados}
          />
        )}
        {modalUpdate && (
          <ModalUpdate
            infoUpdate={infoUpdate}
            modalUpdate={modalUpdate}
            setModalUpdate={setModalUpdate}
            dados={dados}
            setDados={setDados}
          />
        )}
        <div
          className={styles.films}
          style={modalAdd ? { opacity: '0.2' } : { opacity: '1' }}
        >
          {dados.map((filme) => (
            <div key={filme.id} className={styles.containerPhoto}>
              <img src={filme.foto} alt={filme.foto} />
              <section>
                <h1>{filme.nome}</h1>
                <p>Genero: {filme.genero}</p>
                <p>Duração: {filme.duracao} minutos</p>
                <div className={styles.buttonContainer}>
                  <ButtonIcon
                    text="Exluir"
                    onClick={() => deleteFilm(filme.id)}
                  />
                  <ButtonIcon text="Edit" onClick={() => openModal(filme.id)} />
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
