import { createComments } from "../../api/CommentApis"
import { useState } from "react"
import { loadUserData } from "../../helperFunctions/Helper"

export default function CreateComment({ user_id, post_id, setAllComments }){
  const [ commentForm, setCommentForm ] = useState('')
  const createNewComment = (e) => {
    e.preventDefault()
    createComments(user_id, post_id, commentForm, loadUserData().id)
    .then((res) => res.json())
    .then((data) => {
      setAllComments(data);
      setCommentForm('');
    })
  }

  const handleChanges = (e) => {
    setCommentForm(e.target.value)
  }
  return(
    <form
    onSubmit={createNewComment}
    >
      <input
      placeholder="Create Comment..." 
      onChange={handleChanges}
      value = {commentForm}
      type='text'
      />

      <button
      className="cc-btn"
      type='submit'
      >Submit</button>
    </form>
  )
}