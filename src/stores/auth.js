import { useState } from 'react'

let authState = null

export const useAuthStore = () => {
  const login = (data) => {
    authState = data
    localStorage.setItem('user', JSON.stringify(data))
  }

  const logout = () => {
    authState = null
    localStorage.removeItem('user')
  }

  return { authState, login, logout }
}

