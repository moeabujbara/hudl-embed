import React, { useEffect, useState } from "react";
import { showPlaylist } from "../api/hudl";
import "./playlist.css";
import logo from "../assets/logo.svg";
import Media from "./media.js";
import { useParams } from "react-router-dom";
import footer from "../assets/footer.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Moment from "react-moment";
import facebook from "../assets/facebook.svg";
import instgram from "../assets/instgram.svg";
import youtube from "../assets/youtube.svg";
import follow from "../assets/follow.svg";

export default function Playlist() {
  let [playlist, setPlaylist] = useState(null);
  let [error, setError] = useState(null);
  let { playlist_id } = useParams();
  let [date, setDate] = useState(null);
  let [showReleasDate, setShowReleaseDate] = useState(false);

  const fetchPlayistDetails = async () => {
    try {
      let response = await showPlaylist(playlist_id);
      setPlaylist(response.data.playlist);
    } catch (error) {
      setError(error.message);
    }
  };
  const ActionLink = (props) => {
      return (
   <a href="www.facebook.com"></a>

      )
  };
  useEffect(() => {
    fetchPlayistDetails();
  }, []);
  const setReleaseDate = (date) => {
    console.warn("HALA MADRID", date);
    setDate(date);
  };
  if (error === null && playlist === null) {
    return <h3>loading...</h3>;
  } else {
    return playlist !== null ? (
      <div
        id="playlist"
        style={{ backgroundImage: `url("${playlist.user.cover_image.url}")` }}
      >
        <div id="playListTopSection">
          <center>
            {" "}
            <img id="logo" src={logo} alt="logo-image"></img>
          </center>
          <h4 id="text">item Amazing Playlist</h4>
          <h6 id="text1">Created by {playlist.user.username}</h6>
          {showReleasDate ? (
            <h6 id="releaseDateText">
              {" "}
              Release <Moment format="MMMM DD, YYYY">{date}</Moment>{" "}
            </h6>
          ) : null}
          <img
            id="profile"
            src={playlist.user.profile_picture.url}
            alt="profile-picture"
          />
        </div>
        <div id="bottomPlayListSection">
          <Media
            showReleasDate={(value) => setShowReleaseDate(value)}
            setReleaseDate={(date) => setReleaseDate(date)}
            playlistId={playlist.id}
          />
        </div>
        <img id="follow" src={follow}></img>
        <div id="footer">
        <a target="_blank" href="https://twitter.com/HUDLMusic"> 
          <img
            id="twiter"
            src={footer}
            alt="footer"
          ></img>
          </a>
          <a target="_blank" href="https://www.instagram.com/HUDLMusic">
          <img
            id="instgram"
            src={instgram}
            onClick={() => <a href="www.facebook.com" target="blank" />}
            alt="footer"
          ></img>
          </a>
          <a target="_blank" href="https://web.facebook.com/HUDLmusic/">
          <img
            id="facebook"
            src={facebook}
            onClick={() => <a href="www.facebook.com" target="blank" />}
            alt="footer"
          ></img>
          </a>
          <a target="_blank" href="https://www.youtube.com/channel/UCW94g9ZKwnT-LqV_vymDuLA">
          <img
            id="youtube"
            src={youtube}
            onClick={() => <a href="www.facebook.com" target="blank" />}
            alt="footer"
          ></img>
          </a>
        </div>
      </div>
    ) : (
      <h3>please try agian later</h3>
    );
  }
}
