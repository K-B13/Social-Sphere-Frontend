import { isPostOwner, isAuthor } from "../../helperFunctions/Helper"
import { deleteComment } from "../../api/CommentApis"
export default function Comment({ comment, setAllComments }) {

  const deleteAComment = () => {
    deleteComment(comment.user_id, comment.post_id, comment.id)
    .then((res) => res.json())
    .then((data) => setAllComments(data))
  }

  return(
    <div>
    <p>{comment.content}</p>
    {comment.author && <p>{comment.author}</p>}
    {isAuthor(comment) && <button>Update Comment</button>}
    {(isAuthor(comment) || isPostOwner(comment)) && <button
    onClick={deleteAComment}
    >Delete Comment</button>}
    </div>
  )
}