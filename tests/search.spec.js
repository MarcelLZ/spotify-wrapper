import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

import {
  search,
  searchAlbums,
  searchArtists,
  searchTrack,
  searchPlaylist
} from '../src/search'

chai.use(sinonChai)
sinonStubPromise(sinon)
global.fetch = require('node-fetch')

// search (generic) -> search by one more type
// search by albums
// search by artist
// search by tracks
// search by playlist

describe('Search', () => {
  let fetchedStub
  let promise
  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    promise = fetchedStub.returnsPromise()
  })

  afterEach(() => {
    fetchedStub.restore()
  })

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
      expect(searchTrack).to.exist
    })

    it('should exist the searchPlaylist method', () => {
      expect(searchPlaylist).to.exist
    })
  })

  describe('search (generic)', () => {
    it('should call fecth function', () => {
      search()

      expect(fetchedStub).to.have.been.called.calledOnce
    })

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        search('Shontelle', 'artist')

        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Shontelle&type=artist'
        )

        search('Shontelle', 'album')

        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Shontelle&type=album'
        )
      })

      context('passing more than one type', () => {
        search('Shontelle', ['artist', 'album'])

        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Shontelle&type=artist,album'
        )
      })
    })

    it('should return JSON date from the Promise', () => {
      const expectReturn = { 'body': 'json' }
      promise.resolves(expectReturn)

      const artist = search('Shontelle', 'artist')

      expect(artist.resolveValue).to.be.eql(expectReturn)
    })
  })

  describe('search by artists', () => {
    it('should call fetch function', () => {
      searchArtists('Shontelle')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      searchArtists('Shontelle')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Shontelle&type=artist'
      )

      searchArtists('Muse')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=artist'
      )
    })
  })

  describe('search by albums', () => {
    it('should call fetch function', () => {
      searchAlbums('Shontelle')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      searchAlbums('Shontelle')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Shontelle&type=album'
      )

      searchAlbums('Muse')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=album'
      )
    })
  })

  describe('search by tracks', () => {
    it('should call fetch function', () => {
      searchTrack('Shontelle')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      searchTrack('Shontelle')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Shontelle&type=track'
      )

      searchTrack('Muse')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=track'
      )
    })
  })

  describe('search by play list', () => {
    it('should call fetch function', () => {
      searchPlaylist('Shontelle')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      searchPlaylist('Shontelle')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Shontelle&type=playlist'
      )

      searchPlaylist('Muse')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=playlist'
      )
    })
  })
})
