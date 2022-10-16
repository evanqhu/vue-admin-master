import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// 从cookie中读取token
export function getToken() {
  return Cookies.get(TokenKey)
}

// cookie存储服务器返回的token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 从cookie中移除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
