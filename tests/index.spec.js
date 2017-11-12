import { expect } from 'chai'
import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylist
} from '../src'

// search (generic) -> search by one more type
// search by albums
// search by artist
// search by tracks
// search by playlist

describe('Spotify Wrapper', () => {
  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist
    })

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist
    })

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist
    })

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist
    })

    it('should exist the searchPlaylist method', () => {
      expect(searchPlaylist).to.exist
    })
  })

  describe('search (generic)', () => {
    it('should call fecth function', () => {
      const result = search()
    })
  })
})
