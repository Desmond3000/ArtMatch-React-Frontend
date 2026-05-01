export const authAPI = {
  login: async (data) => {
    const response = await fetch('http://your-api-url/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}