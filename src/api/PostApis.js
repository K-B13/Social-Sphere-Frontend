export const userPosts = (user_id) => {
  return fetch(`http://localhost:4000/users/${user_id}/posts`)
}

export const createPosts = (user_id, post_info) => {
  return fetch(`http://localhost:4000/users/${user_id}/posts`,
  {method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user:{
      content: `${post_info}`
    }
    })
  })
}