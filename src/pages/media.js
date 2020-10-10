import React, { useEffect, useState } from "react";
import { indexPlaylistMedia } from "../api/hudl";
import "./media.css";
import playBtn from "../assets/playButton.svg";
import pauseBtn from "../assets/pauseButton.svg";
import sharebtn from "..//assets/share.svg";
import copybutton from "..//assets/copy.svg";
import play from "..//assets/play.svg";
import shuffel from "..//assets/shuffel.svg";
import repeat from "..//assets/repeat.svg";
import Moment from "react-moment";
import Progressbar from "./progressbar";


export default function Media(props) {
  let [media, setMedia] = useState([]);
  let [svgColor, setSvgColor] = useState([]);
  let [WsvgColor, setWsvgColor] = useState([]);
  let [error, setError] = useState(null);
  let [songURL, setSongURL] = useState(null);
  let [selectedID, setSelectedID] = useState(null);
  let [isPlaying, setisPlaying] = useState(false);
  let [show, setShow] = useState(false);
  let [maindisplay, setDisplay] = useState(null);
  let [boolofdisplay, setbool] = useState([false]);
  let [isPlaying1, setisPlaying1] = useState(false);
  let [isCheck, setCheck] = useState(false);
  let [newsongURL, setnewSongURL] = useState(null);

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
    props.showReleasDate(true);
    props.setReleaseDate(index.release_date);
    setSongURL(index.url);
    console.warn("list of songs1--->", songURL);
  };
  const GlobalSong = (index) => {
    setnewSongURL(index.url);
    console.warn("newurlsong", newsongURL);
  };
  const playMusic = (index) => {
    console.warn("INDEX", index);
    var audio = document.getElementById("audio");
    console.warn(audio);
    audio.play();
    setSelectedID(index.id);
    setisPlaying(true);
    console.warn("Condition-->",isPlaying);
    var interval = (audio.duration / 47) * 1000;
    var counter=0;
    var y = setInterval(() => {
           setSvgColor([...svgColor, (svgColor[counter] = "red")]);
        counter++;
    }, interval);
  };
  const pauseMusic = () => {
    console.warn("PAUSE ", isPlaying);
    var audio = document.getElementById("audio");
    console.warn(audio);
    audio.pause();
    setisPlaying(false);
    console.warn("Condition 2-->",isPlaying)
  };

  const playMusic2 = () => {
    if (!songURL) {
      var firstSong = media[0];
      setSelectedID(firstSong.id);
      setSongURL(firstSong.url);
    }

    setisPlaying(false);
    var audio = document.getElementById("audio");
    audio.play();
    setisPlaying1(true);
    setCheck(true);
  };

  const pauseMusic2 = () => {
    setisPlaying(false);
    setisPlaying1(false);
    var audio = document.getElementById("audio");
    audio.pause();
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
    tooltip.innerText = "Share";
  };
  const onMouseout1 = (key) => {
    var tooltip = document.getElementById("myTooltip1" + key);
    tooltip.innerText = "Copy";
  };
  const repeatMusic = () => {
    var audio = document.getElementById("audio");
    console.warn(">>>>>", audio);
    audio.currentTime = 0;
    audio.play();
  };
  const ShaffelMusic = () => {
    var selectedSong = media[Math.floor(Math.random() * media.length)];
    setSelectedID(selectedSong.id);
    setSongURL(selectedSong.url);
    var player = document.getElementById("audio");

    player.play();
    console.warn(player.currentSrc());
    console.warn(player.currentTime());
    console.warn(player.duration());
  };

  if (error === null && media === null) {
    return <h3>loading...</h3>;
  } else {
    return media !== null ? (
      <div id="mainDiv">
        <div id="listSection">
          <ol>
            {media.map((index, key) => (
              <div
                key={key}
                id="main"
                className={`${selectedID == index.id ? "selectedList" : ""}`}
                onMouseEnter={() => mouseTrigger(index)}
                onMouseLeave={() => props.showReleasDate(false)}
              >
                <div id="listItem">
                  <div
                    id="playPauseBtn"
                    className={`${selectedID == index.id ? "showBtns" : ""}`}
                  >
                    {isPlaying ? (
                      <div onClick={() => pauseMusic()}>
                        <img src={pauseBtn}></img>
                      </div>
                    ) : (
                      <div onClick={() => playMusic(index)}>
                        <img src={playBtn}></img>
                      </div>
                    )}
                  </div>
                  <li key={index}>
                    <a href="" id="audioTitle" key={key}>
                      {index.title}
                    </a>
                  </li>
                  <div
                    id="rightButtons"
                    className={`${selectedID == index.id ? "showBtns" : ""}`}
                  >
                    <div id="shareBtn">
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
                    <div id="copyBtn">
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
                </div>
              </div>
            ))}
          </ol>
        </div>
        <div id="audioSection">
          <audio id="audio" controls src={songURL}></audio>
          <Progressbar fill={svgColor} />

          <center>
            <img
              className="A"
              onClick={() => ShaffelMusic()}
              src={shuffel}
            ></img>
            {isPlaying1 ? (
              <img
                className="B"
                onClick={() => pauseMusic2()}
                src={pauseBtn}
              ></img>
            ) : (
              <img className="B" onClick={() => playMusic2()} src={play}></img>
            )}
            {isCheck ? (
              <img
                className="C"
                onClick={() => repeatMusic()}
                src={repeat}
              ></img>
            ) : (
              <img className="C" src={repeat}></img>
            )}
          </center>
        </div>
      </div>
    ) : (
      <h3>please try again later...</h3>
    );
  }
}
