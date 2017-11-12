import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

import {
  getAlbum,
  getAlbums,
  getAlbumTracks
} from '../src/album'

chai.use(sinonChai)
sinonStubPromise(sinon)
global.fetch = require('node-fetch')

// get album
// get albums
// get album tracks

describe('Album', () => {
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
    it('should have `getAlbum` method', () => {
      expect(getAlbum).to.exist
    })

    it('should have `getAlbums` method', () => {
      expect(getAlbums).to.exist
    })

    it('should have `getAlbumTracks` method', () => {
      expect(getAlbumTracks).to.exist
    })
  })

  describe('getting album by id', () => {
    it('should call fetch', () => {
      getAlbum()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with corret url', () => {
      getAlbum(1234)
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/1234'
      )

      getAlbum(4321)
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4321'
      )
    })

    it('should return the correct data from primise', () => {
      const expectedResult = { album: 'name' }
      promise.resolves(expectedResult)

      let album = getAlbum(4321)
      expect(album.resolveValue).to.be.eql(expectedResult)
    })
  })

  describe('getting albums', () => {
    it('should call fetch', () => {
      getAlbums()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with corret url', () => {
      getAlbums(['1234', '4321'])
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums?ids=1234,4321'
      )

      getAlbums(['4321', '1234'])
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums?ids=4321,1234'
      )
    })

    it('should return the correct data from primise', () => {
      const expectedResult = [{ album: 'name' }]
      promise.resolves(expectedResult)

      let albums = getAlbums()
      expect(albums.resolveValue).to.be.eql(expectedResult)
    })
  })

  describe('getting album tracks', () => {
    it('should call fetch', () => {
      getAlbumTracks()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with corret url', () => {
      getAlbumTracks('1234')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/1234/tracks'
      )

      getAlbumTracks('4321')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4321/tracks'
      )
    })

    it('should return the correct data from primise', () => {
      const expectedResult = { album: 'name' }
      promise.resolves(expectedResult)

      let albums = getAlbumTracks()
      expect(albums.resolveValue).to.be.eql(expectedResult)
    })
  })
})
