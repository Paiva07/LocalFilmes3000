import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, ...props }) => {
  return (
    <div className={styles.buttonContainer}>
      <button {...props} className={styles.buttonLogin}>
        {text}
      </button>
    </div>
  );
};

export default Button;
