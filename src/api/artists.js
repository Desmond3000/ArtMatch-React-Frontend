import api from './api'

export const getArtists = () => api.get('/artists')
export const getArtist = (id) => api.get(`/artists/${id}`)
export const followArtist = (id) => api.post(`/artists/${id}/follow`)