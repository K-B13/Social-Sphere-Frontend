export const registerLike = (userId, likeable, likeableId, token) => {
  return fetch(`http://localhost:4000/users/${userId}/${likeable}/${likeableId}/likes`,
  {method: 'POST',
  headers: {
    "Authorization": `${token}`
  }}
  )
}

export const removeLike = (userId, likeable, likeableId, likeId, token) => {
  return fetch(`http://localhost:4000/users/${userId}/${likeable}/${likeableId}/likes${likeId}`,
  {method: 'DELETE',
  headers: {
    "Authorization": `${token}`
  }}
  )
}