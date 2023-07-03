import { apiUrl } from "./ApiConfig"

export const getAllSentRequests = (id) => {
  return fetch(`${apiUrl}/friend_requests/all_sent/${id}`)
}

export const createRequest = (user_id, friend_id) => {
  return fetch(`${apiUrl}/friend_requests`,
  {method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      sender_id: `${user_id}`,
      receiver_id: `${friend_id}`
    })
  })
}

export const respondToFriendRequest = (userId, id, statusChange) => {
  return fetch(`${apiUrl}/friend_requests/${userId}/${id}`,
  {method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      status: `${statusChange}`
    })
  })
}
