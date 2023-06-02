import { useState } from "react"
import { updateComment } from "../../api/CommentApis"

export default function CommentForm({ comment, setAllComments, setUpdateCommentForm }) {
  const [ editedComment, setEditedComment ] = useState(comment)

  const handleChange = (e) => {
    setEditedComment({...editedComment, [e.target.name]: e.target.value})
  }

  const updateAComment = (e) => {
    e.preventDefault()
    updateComment(comment.user_id, comment.post_id, comment.id, editedComment.content)
    .then((response) => response.json())
    .then((data) => {
      setUpdateCommentForm(false)
      setAllComments([...data])
    })
  }

  return (
    <form
    onSubmit={updateAComment}
    >
      <label>Comment Content: </label>
      <input
      name='content'
      value={editedComment.content}
      onChange={handleChange}
      />
      <p>{comment.author}</p>
    </form>
  )
}