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