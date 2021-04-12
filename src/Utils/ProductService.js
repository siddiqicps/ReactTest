import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import { browserHistory } from 'react-router'

import { API_URL } from './constants'

export default class ProductService extends EventEmitter {
  constructor() {
    super()

    // binds login functions to keep this context
    // this.login = this.login.bind(this)
  }

  _getProducts(endpoint, values) {
    return this.fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(values),
    })
  }

  products(searchQuery) {
    return this._getProducts('products', {"SearchQuery":searchQuery})
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('token')
  }

  isAuthenticated() {
    // Checks if there is a saved token and it's still valid
    const token = localStorage.getItem('token')
    if (token) {
      return token
    } else {
      return false
    }
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    if (this.isAuthenticated()) {
      headers['Authorization'] = this.getToken()
    }
console.log("Headers===========",headers)
    return fetch(url, {
      headers,
      ...options
    })
    .then(response => response.json())
  }

}
