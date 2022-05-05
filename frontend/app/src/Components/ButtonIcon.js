import React from 'react';
import styles from './ButtonIcon.module.css';
const ButtonIcon = ({ text, ...props }) => {
  return (
    <div>
      <button {...props} className={styles.button}>
        {text}
      </button>
    </div>
  );
};

export default ButtonIcon;
