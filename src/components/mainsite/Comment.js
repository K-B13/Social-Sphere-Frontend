import { isPostOwner, isAuthor, loadUserData } from "../../helperFunctions/Helper"
import { useState } from "react"
import { deleteComment } from "../../api/CommentApis"
import { registerLike } from "../../api/LikeApise"
import CommentForm from "./CommentForm"

export default function Comment({ comment, setAllComments, post }) {

  const [ updateCommentForm, setUpdateCommentForm ] = useState(false)
  const [ commentLike, setCommentLike ] = useState({
    like_count: comment.like_count,
    liked_by: [...comment.liked_by]
  })

  const deleteAComment = () => {
    deleteComment(comment.user_id, comment.post_id, comment.id)
    .then((res) => res.json())  
    .then((data) => {
      setAllComments(data)})
  }

  const likeButton = () => {
    registerLike(comment.user_id, 'comments', comment.id, JSON.parse(localStorage.getItem('Auth Token')))
    .then((res) => res.json())
    .then((data) => {
      setCommentLike({
      like_count: data.like_count,
      liked_by: [...data.liked_by],
    })})
  }

  return(
    <div className="comment">
      <div className="comment-side extra-post left-post">
      {!commentLike.liked_by.includes(loadUserData().username) ? 
        <button
        onClick={likeButton}
        >
          <img src='https://img.icons8.com/?size=512&id=24816&format=png' width='20px' />
        </button>
        : null
        }
        <p>Likes: {commentLike.like_count}</p>
      </div>
      <div className="comment-mid">
        {updateCommentForm ?

        <CommentForm 
        comment={comment}
        setAllComments={setAllComments}
        setUpdateCommentForm={setUpdateCommentForm}
        />
        :
        <div>
          <p>{comment.content}</p>

          {comment.author && <p>{comment.author}</p>}
          <p>Liked by:
          {commentLike.liked_by.map((info, index) => {
          return index === 0 ? ` ${info}`: `, ${info}`
          })}
          </p>
        </div>
        }

      </div>
      <div className='comment-side extra-post'>
        <div className="change-post">
        {(isAuthor(comment) || isPostOwner(post)) && <button
        onClick={deleteAComment}
        >
          <img src='https://img.icons8.com/?size=2x&id=4887&format=png' width='20px' />
        </button>}

        {isAuthor(comment) && 
        <button
        onClick={() => setUpdateCommentForm(!updateCommentForm)}
        >
          <img src='https://img.icons8.com/?size=512&id=12082&format=png' width='20px' />
        </button>
        }
        </div>
      </div>
    </div>
  )
}