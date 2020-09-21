import axios from "axios";

export const showPlaylist = (id) => {
  return axios.get(`https://hv-api-staging.herokuapp.com/user/playlists/${id}`);
};

export const indexPlaylistMedia = (playlistId) => {
  return axios.get(
    `https://hv-api-staging.herokuapp.com/user/playlists/${playlistId}/playlists_media`
  );
};

export const showUserAlbum = (albumId) => {
  return axios.get(
    `https://hv-api-staging.herokuapp.com/user/albums/${albumId}/album_media`
  );
};

export const media = (Id) => {
  return axios.get(`https://hv-api-staging.herokuapp.com/user/media/${Id}`);
};

export const album = (Id) => {
  return axios.get(`https://hv-api-staging.herokuapp.com/user/albums/${Id}`);
};
