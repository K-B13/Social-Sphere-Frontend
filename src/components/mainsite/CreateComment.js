import { createComments } from "../../api/CommentApis"
import { useState } from "react"
import { loadUserData } from "../../helperFunctions/Helper"

export default function CreateComment({ user_id, post_id, setAllComments, resetCommentButtons }){
  const [ commentForm, setCommentForm ] = useState('')
  const createNewComment = (e) => {
    e.preventDefault()
    createComments(user_id, post_id, commentForm, loadUserData().id)
    .then((res) => res.json())
    .then((data) => {
      resetCommentButtons()
      setAllComments(data)
    })
  }

  const handleChanges = (e) => {
    setCommentForm(e.target.value)
  }
  return(
    <form
    onSubmit={createNewComment}
    >
      <label>Content: </label>

      <input 
      onChange={handleChanges}
      value = {commentForm}
      />

      <button
      type='submit'
      >Submit</button>
    </form>
  )
}