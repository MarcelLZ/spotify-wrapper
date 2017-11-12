import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

import SpotifyWrapper from '../src/spotify-wrapper'

chai.use(sinonChai)
sinonStubPromise(sinon)
global.fetch = require('node-fetch')

describe('Spotify Wrapper', () => {
  it('should create an instance of SpotifyWrapper', () => {
    let spotifyWrapper = new SpotifyWrapper({})

    expect(spotifyWrapper).to.be.an.instanceOf(SpotifyWrapper)
  })

  it('should receive a apiUrl as an option', () => {
    let spotifyWrapper = new SpotifyWrapper({
      apiUrl: 'url'
    })

    expect(spotifyWrapper.apiUrl).to.be.equal('url')
  })

  it('should use a default apiUrl if not provided', () => {
    let spotifyWrapper = new SpotifyWrapper({})

    expect(spotifyWrapper.apiUrl).to.be.equal('https://api.spotify.com/v1')
  })

  it('should receive a token as an option', () => {
    let spotifyWrapper = new SpotifyWrapper({
      token: 'token'
    })

    expect(spotifyWrapper.token).to.be.equal('token')
  })

  describe('request method', () => {
    let fetchedStub
    let promise
    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch')
      promise = fetchedStub.returnsPromise()
    })

    afterEach(() => {
      fetchedStub.restore()
    })

    it('should have a request method', () => {
      let spotifyWrapper = new SpotifyWrapper({})

      expect(spotifyWrapper.request).to.have.exist
    })

    it('should call fetch when request', () => {
      let spotifyWrapper = new SpotifyWrapper({})
      spotifyWrapper.request('url')

      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the right url', () => {
      let spotifyWrapper = new SpotifyWrapper({})
      spotifyWrapper.request('url')

      expect(fetchedStub).to.have.been.calledWith('url')
    })

    it('should call fetch with the right headers', () => {
      let spotifyWrapper = new SpotifyWrapper({
        token: 'token'
      })

      let headers = {
        headers: {
          Authorization: `Bearer token`
        }
      }

      spotifyWrapper.request('url')

      expect(fetchedStub).to.have.been.calledWith('url', headers)
    })
  })
})
