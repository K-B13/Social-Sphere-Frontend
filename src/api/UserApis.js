import { apiUrl } from "./ApiConfig"

export const createUser = (userInfo) => {
  return fetch(`${apiUrl}/signup`,
  {method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user:{
      email: `${userInfo.email}`,
      password: `${userInfo.password}`,
      username: `${userInfo.username}`
    }
    })
  })
}

export const loginUser = (userInfo) => {
  return fetch(`${apiUrl}/login`,
  {method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user:{
      email: `${userInfo.email}`,
      password: `${userInfo.password}`,
      username: `${userInfo.username}`
    }
    })
  })
}

export const logoutUser = (token) => {
  return fetch(`${apiUrl}/logout`,
  {method: 'DELETE',
  headers: {
    "Authorization": `${token}`
  }
  })
}
export const currentUser = () => {
  return fetch(`${apiUrl}/current_user`,
  {method: 'GET',
  headers: {
    "Authorization": `${JSON.parse(localStorage.getItem('Auth Token'))}`
  }
})
}

export const updateUser = (id, newUserInfo) => {
  return fetch(`${apiUrl}/users/${id}`,
  {method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({...newUserInfo})
  })
}

export const searchUsers = (searchQuery, searchKey) => {
  return fetch(`${apiUrl}/users/search?query=${searchQuery}&search_key=${searchKey}`)
}

export const getUser = (user_id, id) => {
  return fetch(`${apiUrl}/users/${user_id}/friend_requests/${id}`)
}
