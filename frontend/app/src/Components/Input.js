import React from 'react';
import styles from './Input.module.css';

const Input = ({ id, type, label, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      <input type={type} id={id} {...props} className={styles.input} />
    </div>
  );
};

export default Input;
