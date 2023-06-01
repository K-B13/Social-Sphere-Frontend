import { deletePost } from "../../api/PostApis"
import { useState } from "react"
import PostForm from "./PostForm"
import Comments from "./Comments"
import CreateComment from "./CreateComment"
export default function Post({ post, setUserPostsList, userPostsList, index }) {
  const [ updateForm, setUpdateForm ] = useState(false)
  const [ showComments, setShowComments ] = useState(false)
  const [ showCreateComments, setShowCreateComments ] = useState(false)
  const deleteAPost = () => {
    deletePost(post.user_id, post.id)
    .then((res) => res.json())
    .then((data) => setUserPostsList(data))
  }
  return(
    <div>
    {updateForm? 
    <PostForm 
    setUpdateForm={setUpdateForm}
    post={post}
    setUserPostsList={setUserPostsList}
    userPostsList={userPostsList}
    index={index}
    />
    : <div><h3>{post.content}</h3>
    <p>Author: {post.author}</p></div>}
    <button
    onClick={deleteAPost}
    >Delete Post</button>
    <button
    onClick={() => setUpdateForm(!updateForm)}
    >Update Post</button>
    <br />

    <button
    onClick={() => {
      setShowCreateComments(false)
      setShowComments(!showComments)
    }}
    >Comments</button>

    {showComments && <button
    onClick={(() => setShowCreateComments(!showCreateComments))}
    >Create Comment</button>}

    {showCreateComments && <CreateComment 
    user_id={post.user_id}
    post_id={post.id}
    />}

    {showComments? <Comments
    userPostsList={userPostsList}
    user_id={post.user_id}
    post_id={post.id}
    />: null}
    </div>
  )
}