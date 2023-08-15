import { isPostOwner, isAuthor, loadUserData, getToken } from "../../helperFunctions/Helper"
import { useState } from "react"
import { deleteComment, updateComment } from "../../api/CommentApis"
import { registerLike } from "../../api/LikeApis"
import CommentForm from "./CommentForm"
import Update from "../../update.png"


export default function Comment({ comment, setAllComments, post }) {

  const [ updateCommentForm, setUpdateCommentForm ] = useState(false)
  const [ commentLike, setCommentLike ] = useState({
    like_count: comment.like_count,
    liked_by: [...comment.liked_by]
  })
  const [ editedComment, setEditedComment ] = useState(comment)

  const deleteAComment = () => {
    deleteComment(comment.user_id, comment.post_id, comment.id)
    .then((res) => res.json())  
    .then((data) => {
      setAllComments(data)})
  }

  const likeButton = () => {
    registerLike(comment.user_id, 'comments', comment.id, getToken())
    .then((res) => res.json())
    .then((data) => {
      setCommentLike({
      like_count: data.like_count,
      liked_by: [...data.liked_by],
    })})
  }

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
        handleChange={handleChange}
        editedComment={editedComment}
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

        <div className="edit-comment">
          {updateCommentForm ? <button
            onClick={updateAComment}
          >
            <img src={Update} width='20px' />
          </button>: null}
          {isAuthor(comment) && 
          <button
          onClick={() => {
            setEditedComment(comment)
            setUpdateCommentForm   (!updateCommentForm)
          }}
          >
            <img src='https://img.icons8.com/?size=512&id=12082&format=png' width='20px' />
          </button>
          }
          </div>
        </div>
      </div>
    </div>
  )
}