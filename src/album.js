/* global fetch */

import { URL_API } from './config'

export const getAlbum = albumId =>
  fetch(`${URL_API}/albums/${albumId}`)
    .then(data => data.json())

export const getAlbums = albumsId =>
  fetch(`${URL_API}/albums?ids=${albumsId}`)

export const getAlbumTracks = (albumId) =>
  fetch(`${URL_API}/albums/${albumId}/tracks`)
