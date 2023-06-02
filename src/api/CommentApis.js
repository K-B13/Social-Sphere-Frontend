export const postComments = (user_id, post_id) => {
  return fetch(`http://localhost:4000//users/${user_id}/posts/${post_id}/comments`)
}

export const createComments = (user_id, post_id, comment_info) => {
  return fetch(`http://localhost:4000/users/${user_id}/posts/${post_id}/comments`,
  {method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      content: `${comment_info}`
    })
  })
}