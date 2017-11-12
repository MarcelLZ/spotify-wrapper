import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

import SpotifyWrapper from '../src/index'

chai.use(sinonChai)
sinonStubPromise(sinon)
global.fetch = require('node-fetch')

// search (generic) -> search by one more type
// search by albums
// search by artist
// search by tracks
// search by playlist

describe('Search', () => {
  let spotify
  let fetchedStub
  let promise
  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'token'
    })
    fetchedStub = sinon.stub(global, 'fetch')
    promise = fetchedStub.returnsPromise()
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('smoke tests', () => {
    it('should exist the `albums` method', () => {
      expect(spotify.search.albums).to.exist
    })

    it('should exist the `artists` method', () => {
      expect(spotify.search.artists).to.exist
    })

    it('should exist the `tracks` method', () => {
      expect(spotify.search.tracks).to.exist
    })

    it('should exist the `playlists` method', () => {
      expect(spotify.search.playlists).to.exist
    })
  })

  describe('search by artists', () => {
    it('should call fetch function', () => {
      spotify.search.artists('Shontelle')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      spotify.search.artists('Shontelle')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Shontelle&type=artist'
      )

      spotify.search.artists('Muse')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=artist'
      )
    })
  })

  describe('search by albums', () => {
    it('should call fetch function', () => {
      spotify.search.albums('Shontelle')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      spotify.search.albums('Shontelle')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Shontelle&type=album'
      )

      spotify.search.albums('Muse')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=album'
      )
    })
  })

  describe('search by tracks', () => {
    it('should call fetch function', () => {
      spotify.search.tracks('Shontelle')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      spotify.search.tracks('Shontelle')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Shontelle&type=track'
      )

      spotify.search.tracks('Muse')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=track'
      )
    })
  })

  describe('search by play list', () => {
    it('should call fetch function', () => {
      spotify.search.playlists('Shontelle')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      spotify.search.playlists('Shontelle')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Shontelle&type=playlist'
      )

      spotify.search.playlists('Muse')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=playlist'
      )
    })
  })
})
