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
      content: `${post_info}`
    })
  })
}

export const updatePosts = (user_id, id, new_post) => {
  return fetch(`http://localhost:4000/users/${user_id}/posts/${id}`,
  {method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      content: `${new_post}`
    })
  })
}

export const deletePost = (user_id, id) => {
  return fetch(`http://localhost:4000/users/${user_id}/posts/${id}`,
  {method: 'DELETE'
  })
}