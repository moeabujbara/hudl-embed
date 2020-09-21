import React, { useEffect, useState } from "react";
import { showPlaylist } from '../api/hudl';
import "./playlist.css";
import logo from "../assets/logo.svg";
import Media from "./media.js";
import { useParams } from "react-router-dom";
import footer from "../assets/footer.svg";

export default function Playlist() {
  let [playlist, setPlaylist] = useState(null)
  let [error, setError] = useState(null)
  let { playlist_id } = useParams();

  const fetchPlayistDetails = async () => {
    try {
      let response = await showPlaylist(playlist_id);
      setPlaylist(response.data.playlist);
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchPlayistDetails()
  }, [])

  if (error === null && playlist === null) {
    return <h3>loading...</h3>
  } else {
    return playlist !== null ? (
      <div id="playlist" style={{ backgroundImage: `url("${playlist.user.cover_image.url}")` }}>
        <center> <img id="logo" src={logo} alt="logo-image"></img></center>
        <h2 id="text">item Amazing Playlist</h2>
        <h5 id="text1">Created by {playlist.user.username}</h5>
        <img id="profile" src={playlist.user.profile_picture.url} alt="profile-picture" />
        <Media playlistId={playlist.id} />
        <img src={footer}></img>
      </div>
    ) : (
        <h3>please try agian later</h3>
      )
  }
}

