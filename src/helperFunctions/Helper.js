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

export const getToken = () => {
  return JSON.parse(localStorage.getItem('Auth Token'))
}

export const transformDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString(undefined, options);
}