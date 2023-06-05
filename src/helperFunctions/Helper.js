export const isPostOwner = (comment) => { 
  return comment.author === JSON.parse(localStorage.getItem('User Info')).username
}

export const isAuthor = (comment) => {
  return comment.author === JSON.parse(localStorage.getItem('User Info')).username
}

export const loadUserData = () => {
  return JSON.parse(localStorage.getItem('User Info'))
}
export const setUserData = (data) => {
  localStorage.setItem('User Info', JSON.stringify(data))
}