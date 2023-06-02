import { isPostOwner, isAuthor } from "../../helperFunctions/Helper"
import { useState } from "react"
import { deleteComment } from "../../api/CommentApis"
import CommentForm from "./CommentForm"
export default function Comment({ comment, setAllComments }) {
  const [ updateCommentForm, setUpdateCommentForm ] = useState(false)
  const deleteAComment = () => {
    deleteComment(comment.user_id, comment.post_id, comment.id)
    .then((res) => res.json())
    .then((data) => setAllComments(data))
  }

  return(
    <div>
      {updateCommentForm? <CommentForm 
      comment={comment}
      setAllComments={setAllComments}
      setUpdateCommentForm={setUpdateCommentForm}
      />:
      <div>
        <p>{comment.content}</p>
      {comment.author && <p>{comment.author}</p>}
      </div>}
      {isAuthor(comment) && 
      <button
      onClick={() => setUpdateCommentForm(!updateCommentForm)}
      >Update Comment</button>
      }
      {(isAuthor(comment) || isPostOwner(comment)) && <button
      onClick={deleteAComment}
      >Delete Comment</button>}
    </div>
  )
}