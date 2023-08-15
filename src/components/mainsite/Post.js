import { deletePost } from "../../api/PostApis"
import { useState } from "react"
import PostForm from "./PostForm"
import Comments from "./Comments"
import { getToken, isAuthor, loadUserData } from "../../helperFunctions/Helper"
import { registerLike } from "../../api/LikeApis"
import Update from "../../update.png"
import { updatePosts } from "../../api/PostApis"

export default function Post({ post, setList, userPostsList, index }) {
  const [ updateForm, setUpdateForm ] = useState(false)
  const [ showComments, setShowComments ] = useState(false)
  const [ editedPost, setEditedPost ] = useState(post)

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
      <div className="post-side extra-post left-post">
      <div>
      {!postLike.liked_by.includes(loadUserData().username) 
    ? <button
    onClick={likeButton}
    >
      <img src='https://img.icons8.com/?size=512&id=24816&format=png' width='20px' />
    </button>
    : null
    }
    <p className="likes">Likes: {postLike.like_count}</p>
    </div> 
      </div>
      <div className='main-post-section'>
    {updateForm ? 
    <PostForm 
    post={post}
    index={index}
    handleChange={handleChange}
    editedPost={editedPost}
    />
    : 
    <div className='post-content'>
      
      <h3>{post.content}</h3>
      <p>Author: {post.author}</p>
      <p>Liked by:
      {postLike.liked_by.map((info, index) => {
        return index === 0 ? ` ${info}`: `, ${info}`
      })}
      </p>
    </div>}

    {!showComments &&
    <button
    className="view-comment-btn"
    onClick={() => {
      setShowComments(true)
    }}
    >View Comments</button>}
    </div>
    <div className="post-side extra-post">
    { isAuthor(post) ? 
    <div className="change-post">
      <button
      onClick={deleteAPost}
      >
        <img src='https://img.icons8.com/?size=2x&id=4887&format=png' width='20px' />
      </button>
      <div className="edit-post">
        {updateForm ? 
        <button
          onClick={updateAPost}
        >
          <img src={Update} width='20px' />
        </button>: null}
        <button
        onClick={() => {
          setEditedPost(post)
          setUpdateForm(!updateForm)
        }}
        >
          <img src='https://img.icons8.com/?size=512&id=12082&format=png' width='20px' />
        </button>
      </div>
    </div>
    : null}
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