import React, { useEffect, useState } from "react";
import { indexPlaylistMedia } from "../api/hudl";
import "./media.css";

export default function Media(props) {
  let [media, setMedia] = useState([]);
  let [error, setError] = useState(null);
  let [date, setDate] = useState(null);
  let [show, setShow] = useState([false]);

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
    console.warn(show);
  };

  if (error === null && media === null) {
    return <h3>loading...</h3>;
  } else {
    return media !== null ? (
      <div id="mainDiv">
        {show ? <div id="release">{date}</div> : null}
        <ol>
          {media.map((index, key) => (
            <div id="main"
              onMouseEnter={() => mouseTrigger(index)}
              onMouseLeave={() => setShow(false)}
            >
              <li key={index}>
                <a href="" id="texting-style" key={key}>
                  {index.title}
                </a>
              </li>
            </div>
          ))}
        </ol>
      </div>
    ) : (
      <h3>please try again later...</h3>
    );
  }
}
