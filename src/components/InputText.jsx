import React from "react";

export default function InputText({
  name,
  meme,
  textAdjust,
  handleTextChange,
  handleDefault,
  handleSize,
}) {
  return (
    <div className="textRow">
      <input
        type="text"
        placeholder={`${name} text`}
        className="form--input"
        name={`${name}Text`}
        value={meme[`${name}Text`]}
        onChange={handleTextChange}
      />
      <div>
        <input
          type="range"
          placeholder="0"
          className="form--input adjust"
          name={`${name}VerAdjust`}
          value={meme[`${name}VerAdjust`]}
          onChange={textAdjust}
          onDoubleClick={handleDefault}
          min={0}
          max={100}
        />

        <input
          type="range"
          placeholder="0"
          className="form--input adjust"
          name={`${name}HorAdjust`}
          value={meme[`${name}HorAdjust`]}
          onChange={textAdjust}
          onDoubleClick={handleDefault}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
}
