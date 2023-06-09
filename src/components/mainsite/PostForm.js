import { useState } from "react"
import { updatePosts } from "../../api/PostApis"

export default function PostForm({ post, setList, setUpdateForm }) {
  const [ editedPost, setEditedPost ] = useState(post)

  const handleChange = (e) => {
    setEditedPost({...editedPost, [e.target.name]: e.target.value})
  }

  const updateAPost = (e) => {
    e.preventDefault()
    updatePosts(editedPost.user_id, editedPost.id, editedPost.content)
    .then((res) => res.json())
    .then((data) => {
      setUpdateForm(false)
      setList(data)
    })
  }
  return(
    <form
    onSubmit={updateAPost}
    className='post-update-form'
    >
      <input
      name='content'
      value={editedPost.content}
      onChange={handleChange}
      />
      <p>Author: {post.author}</p>
    </form>
  )
}