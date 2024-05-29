// authService.js

export function saveToken(token) {
    // Save token to localStorage or sessionStorage
    localStorage.setItem('token', token);
    // Alternatively, you can use sessionStorage instead of localStorage
    // sessionStorage.setItem('token', token);
  }
  
  export function getToken() {
    // Retrieve token from localStorage or sessionStorage
    return localStorage.getItem('token');
    // Alternatively, you can use sessionStorage instead of localStorage
    // return sessionStorage.getItem('token');
  }
  
  export function clearToken() {
    // Clear token from localStorage or sessionStorage
    localStorage.removeItem('token');
    // Alternatively, you can use sessionStorage instead of localStorage
    // sessionStorage.removeItem('token');
  }
  