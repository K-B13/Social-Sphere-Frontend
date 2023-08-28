import { isPostOwner, isAuthor, loadUserData, getToken } from "../../helperFunctions/Helper"
import { useState } from "react"
import { deleteComment, updateComment } from "../../api/CommentApis"
import { registerLike } from "../../api/LikeApis"
import CommentForm from "./CommentForm"
import Update from "../../update.png"
import { useNavigate } from "react-router"

export default function Comment({ comment, setAllComments, post }) {

  const [ updateCommentForm, setUpdateCommentForm ] = useState(false)
  const [ commentLike, setCommentLike ] = useState({
    like_count: comment.like_count,
    liked_by: [...comment.liked_by]
  })
  const [ editedComment, setEditedComment ] = useState(comment)

  const navigate = useNavigate()

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
    .catch(() => {navigate('/')})
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
      <div className="comment-header">
        {comment.author && <p>{comment.author}</p>}

        {(isAuthor(comment) || isPostOwner(post)) && <button
        onClick={deleteAComment}
        className='comment-close'
        >
          <img src='https://img.icons8.com/?size=2x&id=4887&format=png' width='20px' />
        </button>}
      </div>

        {updateCommentForm ?

        <CommentForm 
        comment={comment}
        setAllComments={setAllComments}
        setUpdateCommentForm={setUpdateCommentForm}
        handleChange={handleChange}
        editedComment={editedComment}
        />
        :
        <div className="comment-body">
          <p className="comment-content">{comment.content}</p>
          
        </div>
        }

        <div className="comment-footer">
          <p className="comment-like">
            Likes: {commentLike.like_count}. Liked by:
            {commentLike.liked_by.map((info, index) => {
              return index === 0 ? ` ${info}`: `, ${info}`
            })}
          </p>
            <div>
              {!commentLike.liked_by.includes(loadUserData(). username) ? 
              <button
              className="comment-btns"
              onClick={likeButton}
              >
                <img src='https://img.icons8.com/?size=512&id=24816&format=png' width='20px' />
              </button>
              : null
              }
              {updateCommentForm ? 
                <button
                className="comment-btns"
                onClick={updateAComment}
                > 
                  <img src={Update} width='20px' />
                </button>: null}
                {isAuthor(comment) && 
                  <button
                  className="comment-btns"
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
  )
}