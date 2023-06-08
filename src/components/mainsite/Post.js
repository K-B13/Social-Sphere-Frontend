import { deletePost } from "../../api/PostApis"
import { useState } from "react"
import PostForm from "./PostForm"
import Comments from "./Comments"
import CreateComment from "./CreateComment"
import { isAuthor, loadUserData } from "../../helperFunctions/Helper"
import { registerLike } from "../../api/LikeApise"

export default function Post({ post, setList, userPostsList, index }) {
  const [ updateForm, setUpdateForm ] = useState(false)
  const [ showComments, setShowComments ] = useState(false)

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
  // const resetCommentButtons = () => {
  //   setShowCreateComments(false)
  // }
  const likeButton = () => {
    registerLike(post.user_id, 'posts', post.id, JSON.parse(localStorage.getItem('Auth Token')))
    .then((res) => res.json())
    .then((data) => {
      setPostLike({
      like_count: data.like_count,
      liked_by: [...data.liked_by],
    })})
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
    <p>Likes: {postLike.like_count}</p>
    </div> 
      </div>
      <div className='main-post-section'>
    {updateForm ? 
    <PostForm 
    setUpdateForm={setUpdateForm}
    post={post}
    setList={setList}
    userPostsList={userPostsList}
    index={index}
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
    <button
    onClick={() => setUpdateForm(!updateForm)}
    >
      <img src='https://img.icons8.com/?size=512&id=12082&format=png' width='20px' />
    </button>
    </div>
    : null}
    </div>

    {/* {showComments && <button
    onClick={(() => setShowCreateComments(!showCreateComments))}
    >Create Comment</button>} */}

    {/* {showCreateComments && <CreateComment 
    user_id={post.user_id}
    post_id={post.id}
    setAllComments={setAllComments}
    resetCommentButtons={resetCommentButtons}
    />} */}

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