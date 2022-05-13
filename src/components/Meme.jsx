import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import InputText from "./InputText";
import RenderText from "./RenderText";
import ToggleSize from "./ToggleSize";

export default function Meme() {
  const VER_ADJUST_DEFAULT = 0;
  const HOR_ADJUST_DEFAULT = 50;
  const TEXT_SIZE_DEFAULT = "3em";
  const [meme, setMeme] = useState({
    topText: "",
    topSize: TEXT_SIZE_DEFAULT,
    topVerAdjust: VER_ADJUST_DEFAULT,
    topHorAdjust: HOR_ADJUST_DEFAULT,
    centerText: "",
    centerSize: TEXT_SIZE_DEFAULT,
    centerVerAdjust: HOR_ADJUST_DEFAULT,
    centerHorAdjust: HOR_ADJUST_DEFAULT,
    bottomText: "",
    bottomSize: TEXT_SIZE_DEFAULT,
    bottomVerAdjust: VER_ADJUST_DEFAULT,
    bottomHorAdjust: HOR_ADJUST_DEFAULT,
    imageIndex: 0,
    autoTextSize: true,
    userTextSize: TEXT_SIZE_DEFAULT,
  });
  console.log("🚀 ~ file: Meme.jsx ~ line 9 ~ Meme ~ meme", meme);
  const [allMemes, setAllMemes] = useState([]);
  // console.log("🚀 ~ file: Meme.jsx ~ line 27 ~ Meme ~ allMemes", allMemes);

  const memeContainer = useRef();

  function randomImageURL() {
    const randomImageIndex = Math.floor(Math.random() * allMemes.length);
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageIndex: randomImageIndex,
    }));
  }
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) =>
        setAllMemes(data.data.memes.filter((meme) => meme.box_count < 4))
      );
  }, []);

  useEffect(() => {
    allMemes.length && randomImageURL();
  }, [allMemes]);

  function downloadMeme(e) {
    const divMeme = document.querySelector(".meme");
    const width = divMeme.width;
    const height = divMeme.height;
    html2canvas(divMeme, {
      useCORS: true,
      width,
      height,
    }).then((canvas) => {
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      window.location.href = image;
    });
  }

  function handleTextChange(e) {
    const { name, value } = e.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
    //  Text Auto Size
    autoSizeText(name);
  }

  function autoSizeText(name) {
    if (meme.autoTextSize) {
      const namePosition = name.substring(0, name.indexOf("T"));
      const sizeKey = `${namePosition}Size`;
      const textKey = `${namePosition}TextBox`;
      const textBox = document.getElementById(textKey);

      const currentFontSize = parseFloat(
        meme[sizeKey].substring(0, meme[sizeKey].indexOf("e"))
      );
      const distanceFromBorder =
        memeContainer.current.clientWidth - textBox.clientWidth;
      if (distanceFromBorder < 100)
        setMeme((prevMeme) => ({
          ...prevMeme,
          [sizeKey]: `${currentFontSize - 0.1}em`,
        }));
      else
        setMeme((prevMeme) => ({
          ...prevMeme,
          [sizeKey]: TEXT_SIZE_DEFAULT,
        }));
    }
  }

  function nextImage(e) {
    const { name } = e.target;
    name === "izquierda"
      ? setMeme((prevMeme) => ({
          ...prevMeme,
          imageIndex:
            prevMeme.imageIndex !== 0
              ? prevMeme.imageIndex - 1
              : allMemes.length - 1,
        }))
      : setMeme((prevMeme) => ({
          ...prevMeme,
          imageIndex:
            prevMeme.imageIndex !== allMemes.length - 1
              ? prevMeme.imageIndex + 1
              : 0,
        }));
  }

  function textAdjust(e) {
    const { name, valueAsNumber } = e.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: valueAsNumber,
    }));
  }

  function handleDefault(e) {
    const { name } = e.target;
    (name === "topVerAdjust" || name === "bottomVerAdjust") &&
      setMeme((prevMeme) => ({
        ...prevMeme,
        [name]: VER_ADJUST_DEFAULT,
      }));
    (name === "topHorAdjust" || name === "bottomHorAdjust") &&
      setMeme((prevMeme) => ({
        ...prevMeme,
        [name]: HOR_ADJUST_DEFAULT,
      }));
  }

  function handleSelect(e) {
    const { value } = e.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageIndex: allMemes.indexOf(allMemes.find((meme) => meme.id === value)),
    }));
  }

  function handleSize(e) {
    const { checked, value } = e.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      autoTextSize: checked,
    }));
    if (!isNaN(value)) {
      setMeme((prevMeme) => ({
        ...prevMeme,
        userTextSize: `${value}em`,
      }));
    }
    // if text changed during user size mode, its size needs to be recalculated
    if (checked) {
      autoSizeText("top");
      autoSizeText("center");
      autoSizeText("bottom");
    }
  }

  return (
    <main className="main">
      {/* ****** COL LEFT */}
      <div className="colLeft">
        <InputText
          name="top"
          meme={meme}
          handleTextChange={handleTextChange}
          textAdjust={textAdjust}
          handleDefault={handleDefault}
        />
        <InputText
          name="center"
          meme={meme}
          handleTextChange={handleTextChange}
          textAdjust={textAdjust}
          handleDefault={handleDefault}
        />
        <InputText
          name="bottom"
          meme={meme}
          handleTextChange={handleTextChange}
          textAdjust={textAdjust}
          handleDefault={handleDefault}
        />
        {/* ****** TEXT SIZE */}
        <div className="textSize">
          <p>Text size</p>
          <div className="options">
            <div className="auto">
              <p>Auto</p>
              <input
                type="checkbox"
                onChange={handleSize}
                checked={meme.autoTextSize}
              />
            </div>
            <div className="user">
              <p>User</p>
              <input
                type="number"
                onChange={handleSize}
                disabled={meme.autoTextSize}
                step={0.1}
                value={parseFloat(
                  meme.userTextSize.substring(0, meme.userTextSize.indexOf("e"))
                )}
              />
            </div>
          </div>
        </div>
        {/* ******** DOWNLOAD BUTTON  */}
        <button
          onClick={downloadMeme}
          className="form--button download"
          title="Descarga!!!"
        >
          Download
        </button>
      </div>
      {/* ****** COL RIGHT */}
      <div className="colRight">
        <nav className="nav">
          <button
            onClick={nextImage}
            name="izquierda"
            className="form--button "
          >
            izq
          </button>
          <button onClick={nextImage} name="derecha" className="form--button">
            der
          </button>
          <select onChange={handleSelect} className="select">
            {allMemes.length &&
              allMemes.map((thisMeme) => (
                <option
                  value={thisMeme.id}
                  key={thisMeme.id}
                  selected={thisMeme.id === allMemes[meme.imageIndex].id}
                >
                  {thisMeme.name}
                </option>
              ))}
          </select>
          <button onClick={randomImageURL} className="form--button random">
            ???
          </button>
        </nav>
        {/* ******** IMAGE  */}
        <div ref={memeContainer} className="meme">
          {allMemes.length && (
            <img
              src={allMemes[meme.imageIndex].url}
              alt="meme"
              className="meme--image"
            />
          )}
          {/* ******** MEME TEXTS  */}
          <RenderText name="top" meme={meme} />
          <RenderText name="center" meme={meme} />
          <RenderText name="bottom" meme={meme} />
        </div>
      </div>
    </main>
  );
}
