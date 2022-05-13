import React from "react";

export default function RenderText({ name, meme }) {
  return (
    <div>
      <h2
        //   Uncaught Error: Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref
        id={`${name}TextBox`}
        className="meme--text"
        style={{
          fontSize: meme.autoTextSize
            ? meme[`${name}Size`]
            : `${meme.userTextSize}`,
          [name === "bottom" ? "bottom" : "top"]: `${
            meme[`${name}VerAdjust`]
          }%`,
          left: `${meme[`${name}HorAdjust`]}%`,
          transform: `translateX(${-meme[`${name}HorAdjust`]}%)`,
        }}
      >
        {meme[`${name}Text`]}
      </h2>
    </div>
  );
}
