import React, { useEffect, useState } from "react";
import { indexPlaylistMedia } from "../api/hudl";
import "./media.css";
import playBtn from "../assets/playButton.svg";
import pauseBtn from "../assets/pauseButton.svg";
import sharebtn from "..//assets/share.svg";



export default function Media(props) {
  let [media, setMedia] = useState([]);
  let [error, setError] = useState(null);
  let [date, setDate] = useState(null);
  let [songURL, setSongURL] = useState(null);
  let [isPlaying, setIsPlaying] = useState(false);
  let [show, setShow] = useState(false);
  let [maindisplay, setDisplay] = useState(null);
  let [boolofdisplay, setbool] = useState([false]);

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
  };

  const pauseMusic = () => {
    console.warn("PAUSE ", isPlaying);
    var audio = document.getElementById("audio");
    console.warn(audio);
    audio.pause();
    setIsPlaying(false);
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
  

  if (error === null && media === null) {
    return <h3>loading...</h3>;
  } 
  else {
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
                  {setShow ? (
                    <div className="playBtn">
                      <span
                        key={key}
                        className="tooltiptext"
                        id={"myTooltip" + key}
                      >
                        Share
                      </span>
                      <img
                        key={key}
                        id="Share"
                        onClick={() => handleCopy(index.url, key)}
                        src={sharebtn}
                      ></img>
                    </div>
                  ) : null}
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
          <audio id="audio" controls src={songURL}></audio>
        </div>
      </div>
  
    ) : (
      <h3>please try again later...</h3>
    );
    }}

  