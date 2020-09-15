import React, { useEffect, useState } from "react";
import { indexPlaylistMedia } from "../api/hudl";
import "./media.css";

export default function Media(props) {
  let [media, setMedia] = useState([]);
  let [error, setError] = useState(null);

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

  if (error === null && media === null) {
    return <h3>loading...</h3>;
  } else {
    return media !== null ? (
      media.map((index, key) => (
        <div>
          <h2 key={key} kid="new-text">
            {index.title}
          </h2>
        </div>
      ))
    ) : (
      <h3>please try again later...</h3>
    );
  }
}
