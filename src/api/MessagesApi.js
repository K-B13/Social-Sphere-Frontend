import { apiUrl } from "./ApiConfig"

export const getMessages = (otherUserId, token) => {
  return fetch(`${apiUrl}/users/${otherUserId}/messages`,
  {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
}

export const sendMessage = (data, otherUserId, token) => {
  return fetch(`${apiUrl}/users/${otherUserId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({content: data}),
  });
}

