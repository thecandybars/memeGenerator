import React from "react";
import styles from "./ToggleSize.module.css";
import { ImFontSize } from "react-icons/im";

export default function ToggleSize({ meme, toggleSize, handleUserTextSize }) {
  return (
    <div className={styles.toggle}>
      <ImFontSize className={styles.label} />
      <div className={styles.sizeControls}>
        <p
          className={styles.auto}
          style={!meme.autoTextSize ? { opacity: "20%" } : {}}
        >
          AUTO{meme.autoTextSize}{" "}
        </p>
        <div
          className={
            meme.autoTextSize
              ? styles.slider
              : `${styles.slider} ${styles.user}`
          }
          onClick={toggleSize}
        >
          <div className={styles.circle}></div>
        </div>
        <input
          className={styles.number}
          type="number"
          onChange={handleUserTextSize}
          disabled={meme.autoTextSize}
          step={0.1}
          min={1}
          max={8}
          value={parseFloat(
            meme.userTextSize.substring(0, meme.userTextSize.indexOf("e"))
          )}
        />
      </div>
    </div>
  );
}
