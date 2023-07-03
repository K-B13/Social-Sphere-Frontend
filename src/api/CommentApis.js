import { apiUrl } from "./ApiConfig"

export const postComments = (user_id, post_id) => {
  return fetch(`${apiUrl}/users/${user_id}/posts/${post_id}/comments`)
}

export const createComments = (user_id, post_id, comment_info, author_id) => {
  return fetch(`${apiUrl}/users/${user_id}/posts/${post_id}/comments/${author_id}`,
  {method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      content: `${comment_info}`
    })
  })
}

export const updateComment = (user_id, post_id, id, commentInfo) => {
  return fetch(`${apiUrl}/users/${user_id}/posts/${post_id}/comments/${id}`,
  {method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      content: `${commentInfo}`
    })
  })
}

export const deleteComment = (user_id, post_id, id) => {
  return fetch(`${apiUrl}/users/${user_id}/posts/${post_id}/comments/${id}`,
  {method: 'DELETE'
  })
}
