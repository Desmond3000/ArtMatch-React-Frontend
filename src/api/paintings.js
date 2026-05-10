import api from './api'

export const getPaintings = () => api.get('/paintings')
export const getPainting = (id) => api.get(`/paintings/${id}`)
export const likePainting = (id) => api.post(`/paintings/${id}/like`)
export const savePainting = (id) => api.post(`/paintings/${id}/save`)