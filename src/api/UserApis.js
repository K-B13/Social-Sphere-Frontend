export const createUser = (userInfo) => {
  return fetch(`http://localhost:4000/signup`,
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
  return fetch(`http://localhost:4000/login`,
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
  return fetch(`http://localhost:4000/logout`,
  {method: 'DELETE',
  headers: {
    "Authorization": `${token}`
  }
  })
}
export const currentUser = () => {
  return fetch(`http://localhost:4000/current_user`,
  {method: 'GET',
  headers: {
    "Authorization": `${JSON.parse(localStorage.getItem('Auth Token'))}`
  }
})
}

export const updateUser = (id, newUserInfo) => {
  return fetch(`http://localhost:4000/users/${id}`,
  {method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({...newUserInfo})
  })
}

export const searchUsers = (searchQuery, searchKey) => {
  return fetch(`http://localhost:4000/users/search?query=${searchQuery}&search_key=${searchKey}`)
}

export const getUser = (user_id, id) => {
  return fetch(`http://localhost:4000/users/${user_id}/friend_requests/${id}`)
}
