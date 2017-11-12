/* global fetch */

import { URL_API, HEADERS } from './config'
// import fetch from 'node-fetch'

export const search = (query, type) =>
  fetch(`${URL_API}/search?q=${query}&type=${type}`, HEADERS)
    .then(data => data.json())

export const searchArtists = (query) =>
  search(query, 'artist')

export const searchAlbums = (query) =>
  search(query, 'album')

export const searchTrack = (query) =>
  search(query, 'track')

export const searchPlaylist = (query) =>
  search(query, 'playlist')
