function searcher (type, query) {
  return this.request(`${this.apiUrl}/search?q=${query}&type=${type}`)
}

export default function search () {
  return {
    artist: searcher.bind(this, 'artist'),
    albums: searcher.bind(this, 'album'),
    track: searcher.bind(this, 'track'),
    playlist: searcher.bind(this, 'playlist')
  }
}
