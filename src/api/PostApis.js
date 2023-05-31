export const userPosts = (user_id) => {
  return fetch(`http://localhost:4000/users/${user_id}/posts`)
}