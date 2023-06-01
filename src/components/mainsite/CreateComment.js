import { createComments } from "../../api/CommentApis"
import { useState } from "react"
export default function CreateComment({ user_id, post_id}){
  const [ commentForm, setCommentForm ] = useState('')
  const createNewComment = (e) => {
    e.preventDefault()
    createComments(user_id, post_id, commentForm)
    .then((res) => res.json())
    .then((data) => console.log(data))
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