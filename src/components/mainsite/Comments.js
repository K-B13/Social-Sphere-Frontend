import { useEffect } from "react"
import { postComments } from "../../api/CommentApis"
import Comment from './Comment'
import CreateComment from './CreateComment'

export default function Comments({ user_id, post_id, userPostsList, allComments, setAllComments, post, setShowComments }){
  
  useEffect(() => {
    postComments(user_id, post_id)
    .then((res) => res.json())
    .then((data) => {
      setAllComments([...data.data])})
  }, [userPostsList])
  return(
    <div className="comments">
      <div>
        <div className="post-heading">
          <p className="post-author">{post.author}</p>
          <div className="post-close-container">
            <button 
              onClick={() => setShowComments(false)}
              className="post-close">
                <img src='https://img.icons8.com/?size=512&id=66767&format=png' width='30px'/>
            </button>
          </div>
        </div>
        <h5 className="post-comment">{post.content}</h5>
      </div>
      <div className="comments-mid">
        <div className="comment-container">
          {allComments.map((comment) => {
            return <Comment 
            comment={comment}
            key={comment.id}
            setAllComments={setAllComments}
            post={post}
          />
          })}
        </div>
        <CreateComment 
        user_id={post.user_id}
        post_id={post.id}
        setAllComments={setAllComments}
        />
      </div>
    </div>
  )

}