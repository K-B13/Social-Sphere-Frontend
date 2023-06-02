import { isPostOwner, isAuthor } from "../../helperFunctions/Helper"

export default function Comment({ comment }) {


  return(
    <div>
    <p>{comment.content}</p>
    {comment.author && <p>{comment.author}</p>}
    {isAuthor(comment) && <button>Update Comment</button>}
    {(isAuthor(comment) || isPostOwner(comment)) && <button>Delete Comment</button>}
    </div>
  )
}