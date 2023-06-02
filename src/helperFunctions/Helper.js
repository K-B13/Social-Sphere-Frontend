export const isPostOwner = (comment) => { 
  return comment.post_id === JSON.parse(localStorage.getItem('User Info')).username
}

export const isAuthor = (comment) => {
  return comment.author === JSON.parse(localStorage.getItem('User Info')).username
}