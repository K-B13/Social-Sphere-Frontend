import { deletePost } from "../../api/PostApis"
import { useState } from "react"
import PostForm from "./PostForm"
import Comments from "./Comments"
import { getToken, isAuthor, loadUserData } from "../../helperFunctions/Helper"
import { registerLike } from "../../api/LikeApis"
import Update from "../../update.png"
import { updatePosts } from "../../api/PostApis"
import { Edit, CommentPicture } from '../../pictures/index'
import { useNavigate } from "react-router"

export default function Post({ post, setList, userPostsList, index }) {
  const [ updateForm, setUpdateForm ] = useState(false)
  const [ showComments, setShowComments ] = useState(false)
  const [ editedPost, setEditedPost ] = useState(post)

  const navigate = useNavigate();

  const [ allComments, setAllComments ] = useState([])
  const [postLike, setPostLike ] = useState({
    like_count: post.like_count,
    liked_by: [...post.liked_by]
  })

  const deleteAPost = () => {
    deletePost(post.user_id, post.id)
    .then((res) => res.json())
    .then((data) => setList(data))
  }

  const likeButton = () => {
    registerLike(post.user_id, 'posts', post.id, getToken())
    .then((res) => res.json())
    .then((data) => {
      setPostLike({
      like_count: data.like_count,
      liked_by: [...data.liked_by],
    })})
    .catch(() => {navigate('/')})
  }

  const handleChange = (e) => {
    setEditedPost({...editedPost, [e.target.name]: e.target.value})
  }

  const updateAPost = (e) => {
    e.preventDefault()
    updatePosts(editedPost.user_id, editedPost.id, editedPost.content)
    .then((res) => res.json())
    .then((data) => {
      setUpdateForm(false)
      setList(data)
    })
  }

  return(

    <div className="post">

      <div className="post-heading">
        <p
        className="post-author"
        >
          {post.author}
        </p>

        { isAuthor(post) ? 
          <div className="post-close-container">
            <button
            className="post-close"
            onClick={deleteAPost}
            >
              <img src='https://img.icons8.com/?size=2x&id=4887&format=png' width='20px' />
            </button>
        </div>
          : null}
      </div>

      {updateForm ? 
        <PostForm 
        post={post}
        index={index}
        handleChange={handleChange}
        editedPost={editedPost}
        />
        : 
        <div className="post-content">
          <h5
          className="post-body"
          >{post.content}</h5>
          <p
            className="post-likes"
          >Likes: {postLike.like_count}. Liked by:
          {postLike.liked_by.map((info, index) => {
            return index === 0 ? ` ${info}`: `, ${info}`
          })}
          </p>
        </div>
      }

      <div className="post-footer">
        {!postLike.liked_by.includes(loadUserData().username) 
          ? <button
          onClick={likeButton}
          className='post-btns'
          >
            <img src='https://img.icons8.com/?size=512&id=24816&format=png' width='15px' />
          </button>
          : null
          }
        {!showComments &&
          <button
          onClick={() => {
            setShowComments(true)
          }}
          className='post-btns'
          >
            <img src={CommentPicture}  width='15px'/>
          </button>}

        {updateForm ? 
        <button
          onClick={updateAPost}
          className='post-btns'
        >
          <img src={Update} width='15px' />
        </button>: null}
        <button
        onClick={() => {
          setEditedPost(post)
          setUpdateForm(!updateForm)
        }}
        className='post-btns'
        >
          <img src={Edit} width='15px' />
        </button>
      </div>

      {showComments? <Comments
      setShowComments={setShowComments}
      userPostsList={userPostsList}
      user_id={post.user_id}
      post_id={post.id}
      post={post}
      allComments={allComments}
      setAllComments={setAllComments}
      />: null}
    </div>
  )
}