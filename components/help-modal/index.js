import React from 'react';
import styles from './style.css';

function HelpModal(props) {
  const { open, toggleOpen } = props;
  return (
    <div className={`${styles.modal} ${open ? styles.open : styles.closed}`}>
      <div className={styles.content}>
        <button type="button" onClick={toggleOpen} className={styles.closeButton}><i className="fas fa-times"></i></button>
        <h1 className={styles.header}>Help</h1>
        <div>This is a truth table generator. How cool!</div>
      </div>
    </div>
  );
}

export default HelpModal;
