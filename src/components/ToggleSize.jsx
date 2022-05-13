import React from "react";
import styles from "./ToggleSize.module.css";

export default function ToggleSize({ meme, toggleSize }) {
  return (
    <div className={styles.toggle}>
      <p className={styles.auto}>auto</p>
      <div
        className={
          meme.autoTextSize ? styles.slider : `${styles.slider} ${styles.user}`
        }
        onClick={toggleSize}
      >
        <div className={styles.circle}></div>
      </div>
      <input
        className={styles.number}
        type="number"
        onChange={toggleSize}
        disabled={meme.autoTextSize}
        step={0.1}
        value={parseFloat(
          meme.userTextSize.substring(0, meme.userTextSize.indexOf("e"))
        )}
      />
    </div>
  );
}
