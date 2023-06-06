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
  const [ showCreateComments, setShowCreateComments ] = useState(false)
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
  const resetCommentButtons = () => {
    setShowCreateComments(false)
  }
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
    <div>
    {updateForm? 
    <PostForm 
    setUpdateForm={setUpdateForm}
    post={post}
    setList={setList}
    userPostsList={userPostsList}
    index={index}
    />
    : <div>
      <h3>{post.content}</h3>
      <p>Likes: {postLike.like_count}</p>
      <p>Liked by:
      {postLike.liked_by.map((info, index) => {
        return index === 0 ? ` ${info}`: `, ${info}`
      })}
      </p>
      <p>Author: {post.author}</p>
    </div>}

    {!postLike.liked_by.includes(loadUserData().username) 
    ? <button
    onClick={likeButton}
    >Like</button>
    : null
    }

    { isAuthor(post) ? 
    <div>
    <button
    onClick={deleteAPost}
    >Delete Post</button>
    <button
    onClick={() => setUpdateForm(!updateForm)}
    >Update Post</button>
    </div>
    : null}
    <br />

    <button
    onClick={() => {
      resetCommentButtons()
      setShowComments(!showComments)
    }}
    >Comments</button>

    {showComments && <button
    onClick={(() => setShowCreateComments(!showCreateComments))}
    >Create Comment</button>}

    {showCreateComments && <CreateComment 
    user_id={post.user_id}
    post_id={post.id}
    setAllComments={setAllComments}
    resetCommentButtons={resetCommentButtons}
    />}

    {showComments? <Comments
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