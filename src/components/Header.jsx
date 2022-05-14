import React from "react";
import { GiFactory } from "react-icons/gi";

export default function Header() {
  return (
    <header className="header">
      <GiFactory className="icon" />
      <div className="title">MEME FACTORY</div>
    </header>
  );
}
