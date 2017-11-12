import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

import SpotifyWrapper from '../src/index'

chai.use(sinonChai)
sinonStubPromise(sinon)
global.fetch = require('node-fetch')

// get album
// get albums
// get album tracks

describe('Album', () => {
  let fetchedStub
  let promise
  let spotify
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
    it('should have `get` method', () => {
      expect(spotify.albums.get).to.exist
    })

    it('should have `getAll` method', () => {
      expect(spotify.albums.getAll).to.exist
    })

    it('should have `getTracks` method', () => {
      expect(spotify.albums.getTracks).to.exist
    })
  })

  describe('getting album by id', () => {
    it('should call fetch', () => {
      spotify.albums.get()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with corret url', () => {
      spotify.albums.get(1234)
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/1234'
      )

      spotify.albums.get(4321)
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4321'
      )
    })

    it('should return the correct data from primise', () => {
      const expectedResult = { album: 'name' }
      promise.resolves(expectedResult)

      let album = spotify.albums.get(4321)
      expect(album.resolveValue).to.be.eql(expectedResult)
    })
  })

  describe('getting albums', () => {
    it('should call fetch', () => {
      spotify.albums.getAll()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with corret url', () => {
      spotify.albums.getAll(['1234', '4321'])
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums?ids=1234,4321'
      )

      spotify.albums.getAll(['4321', '1234'])
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums?ids=4321,1234'
      )
    })

    it('should return the correct data from primise', () => {
      const expectedResult = [{ album: 'name' }]
      promise.resolves(expectedResult)

      let albums = spotify.albums.getAll()
      expect(albums.resolveValue).to.be.eql(expectedResult)
    })
  })

  describe('getting album tracks', () => {
    it('should call fetch', () => {
      spotify.albums.getTracks()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with corret url', () => {
      spotify.albums.getTracks('1234')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/1234/tracks'
      )

      spotify.albums.getTracks('4321')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4321/tracks'
      )
    })

    it('should return the correct data from primise', () => {
      const expectedResult = { album: 'name' }
      promise.resolves(expectedResult)

      let albums = spotify.albums.getTracks()
      expect(albums.resolveValue).to.be.eql(expectedResult)
    })
  })
})
