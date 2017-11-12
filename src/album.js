export default function albums () {
  return {
    get: albumId => this.request(`${this.apiUrl}/albums/${albumId}`),
    getAll: albumsId => this.request(`${this.apiUrl}/albums?ids=${albumsId}`),
    getTracks: albumId => this.request(`${this.apiUrl}/albums/${albumId}/tracks`)
  }
}
