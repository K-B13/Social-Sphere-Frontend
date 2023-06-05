import { useState } from "react"
import { createPosts } from "../../api/PostApis"

export default function CreatePostForm({ setUserPostsList, setRevealPost, setTypeOfPost }) {
  const [ commentForm, setCommentForm ] = useState("")

  const handleChange = (e) => {
    setCommentForm(e.target.value)
  }

  const brandNewPost = (e) => {
    e.preventDefault()
    createPosts(JSON.parse(localStorage.getItem('User Info')).id, commentForm)
    .then((res) => res.json())
    .then((data) => {
      setRevealPost(false)
      setTypeOfPost(0)
      setUserPostsList(data)
    })
  }
  return(

    <form
    onSubmit={brandNewPost}
    >
      <label>Your Message</label>
      <input
      onChange={handleChange}
      value={commentForm}
      />
      <button
      type='submit'
      >Post Message</button>
    </form>
  )
}