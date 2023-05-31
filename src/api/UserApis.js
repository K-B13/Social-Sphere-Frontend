export const createUser = (userInfo) => {
  return fetch(`http://localhost:4000/signup`,
  {method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user:{
      email: `${userInfo.email}`,
      password: `${userInfo.password}`
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
      password: `${userInfo.password}`
    }
    })
  })
}