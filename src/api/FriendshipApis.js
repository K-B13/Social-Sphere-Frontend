export const deleteFriendship = (user_id, id) => {
  return fetch(`http://localhost:4000/friendships/${user_id}/${id}`,
  {method: 'DELETE'
  })
}

export const retrieveFriends = (id) => {
  return fetch(`http://localhost:4000//users/getFriends/${id}`)
}