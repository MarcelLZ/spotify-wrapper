/* global fetch */

import { URL_API, HEADERS } from './config'

export const getAlbum = albumId =>
  fetch(`${URL_API}/albums/${albumId}`, HEADERS)
    .then(data => data.json())

export const getAlbums = albumsId =>
  fetch(`${URL_API}/albums?ids=${albumsId}`, HEADERS)
    .then(data => data.json())

export const getAlbumTracks = (albumId) =>
  fetch(`${URL_API}/albums/${albumId}/tracks`, HEADERS)
    .then(data => data.json())
