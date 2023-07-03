import { apiUrl } from "./ApiConfig"

export const deleteFriendship = (user_id, id) => {
  return fetch(`${apiUrl}/friendships/${user_id}/${id}`,
  {method: 'DELETE'
  })
}

export const retrieveFriends = (id) => {
  return fetch(`${apiUrl}/users/getFriends/${id}`)
}

export const getAllFriends = (id) => {
  return fetch(`${apiUrl}/users/allFriends/${id}`)
}