import React, { useEffect, useState } from "react";
import { indexPlaylistMedia } from "../api/hudl";
import "./media.css";
import playBtn from "../assets/playButton.svg";
import pauseBtn from "../assets/pauseButton.svg";
import sharebtn from "..//assets/share.svg";
import copybutton from "..//assets/copy.svg";
import bar from "..//assets/progress-bar.svg";
import play from "..//assets/play.svg";
import shuffel from "..//assets/shuffel.svg";
import repeat from "..//assets/repeat.svg";

export default function Media(props) {
  let [media, setMedia] = useState([]);
  let [error, setError] = useState(null);
  let [date, setDate] = useState(null);
  let [songURL, setSongURL] = useState(null);
  let [isPlaying, setIsPlaying] = useState(false);
  let [show, setShow] = useState(false);
  let [maindisplay, setDisplay] = useState(null);
  let [boolofdisplay, setbool] = useState([false]);
  let [isPlaying1, setIsPlaying1] = useState(false);

  const fetchPlayistDetails = async () => {
    try {
      let response = await indexPlaylistMedia(props.playlistId);
      setMedia(response.data.media);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchPlayistDetails();
  }, []);

  const mouseTrigger = (index) => {
    setShow(true);
    setDate(index.release_date);
    setSongURL(index.url);
  };

  const playMusic = () => {
    console.warn("PLAY ", isPlaying);
    var audio = document.getElementById("audio");
    console.warn(audio);
    audio.play();
    setIsPlaying(true);
    setIsPlaying1(true);
  };

  const pauseMusic = () => {
    console.warn("PAUSE ", isPlaying);
    var audio = document.getElementById("audio");
    console.warn(audio);
    audio.pause();
    setIsPlaying(false);
    setIsPlaying1(false);
  };
  const handleCopy = (text, key) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    var tooltip = document.getElementById("myTooltip" + key);
    tooltip.innerText = "Copied";
  };
  const handleCopy1 = (text, key) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    var tooltip = document.getElementById("myTooltip1" + key);
    tooltip.innerText = "Copied";
  };

  const onMouseout = (key) => {
    var tooltip = document.getElementById("myTooltip" + key);
    tooltip.innerText = "Copied";
  };
  const onMouseout1 = (key) => {
    var tooltip = document.getElementById("myTooltip1" + key);
    tooltip.innerText = "Copy";
  };
  const repeatMusic = () => {
    var audio = document.getElementById("audio");
    audio.play();
  };

  if (error === null && media === null) {
    return <h3>loading...</h3>;
  } else {
    return media !== null ? (
      <div id="mainDiv">
        {show ? <div id="release">{date}</div> : null}
        <div>
          <ol className="musicList">
            {media.map((index, key) => (
              <div
                key={key}
                id="main"
                onMouseEnter={() => mouseTrigger(index)}
                onMouseLeave={() => setShow(false)}
              >
                <div className="btnContainer">
                  <div className="playBtn1">
                    <img
                      id="Share"
                      onClick={() => handleCopy(index.url, key)}
                      onMouseLeave={() => onMouseout(key)}
                      src={sharebtn}
                    ></img>
                    <span className="tooltiptext" id={"myTooltip" + key}>
                      Share
                    </span>
                  </div>
                </div>
                <div className="btnContainer2">
                  <div className="playBtn2">
                    <img
                      id="Share"
                      onClick={() => handleCopy1(index.url, key)}
                      onMouseLeave={() => onMouseout1(key)}
                      src={copybutton}
                    ></img>
                    <span className="tooltiptext1" id={"myTooltip1" + key}>
                      Copy
                    </span>
                  </div>
                </div>
                <div className="btnContainer">
                  {isPlaying ? (
                    <div className="playBtn" onClick={() => pauseMusic()}>
                      <img src={pauseBtn}></img>
                    </div>
                  ) : (
                    <div className="playBtn" onClick={() => playMusic()}>
                      <img src={playBtn}></img>
                    </div>
                  )}
                </div>
                <li key={index} className="list">
                  <a href="" id="texting-style" key={key}>
                    {index.title}
                  </a>
                </li>
              </div>
            ))}
          </ol>
          <div>
            <audio id="audio" controls src={songURL}></audio>
            <img id="progresbar" src={bar}></img>
            <center>
              <img className="A" src={shuffel}></img>

              {isPlaying1 ? (
                <img
                  className="B"
                  onClick={() => pauseMusic()}
                  src={pauseBtn}
                ></img>
              ) : (
                <img className="B" onClick={() => playMusic()} src={play}></img>
              )}
              <img
                className="C"
                onClick={() => repeatMusic()}
                src={repeat}
              ></img>
            </center>
          </div>
        </div>
      </div>
    ) : (
      <h3>please try again later...</h3>
    );
  }
}
