import React from "react";
import {
  HiOutlineSwitchHorizontal,
  HiOutlineSwitchVertical,
} from "react-icons/hi";

export default function InputText({
  name,
  meme,
  textAdjust,
  handleTextChange,
  handleDefault,
  handleSize,
}) {
  const placeholder = `${name[0].toUpperCase()}${name.substring(
    1,
    name.length
  )} text`;
  return (
    <div className="textRow">
      <input
        type="text"
        placeholder={placeholder}
        className="form--input"
        name={`${name}Text`}
        value={meme[`${name}Text`]}
        onChange={handleTextChange}
      />
      <div className="controls">
        <HiOutlineSwitchVertical />
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
        <HiOutlineSwitchHorizontal />
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
