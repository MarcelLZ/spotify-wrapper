/* global fetch */

import { URL_API } from './config'
import search from './search'
import albums from './album'

export default class SpotifyWrapper {
  constructor (options) {
    this.apiUrl = options.apiUrl || URL_API
    this.token = options.token

    this.search = search.bind(this)()
    this.albums = albums.bind(this)()
  }

  request (url) {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }

    return fetch(url, headers).then(data => data.json())
  }
}
