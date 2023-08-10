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
      <div className="comments-side"></div>
      <div className="comments-mid">
        <CreateComment 
        user_id={post.user_id}
        post_id={post.id}
        setAllComments={setAllComments}
        />
        {allComments.map((comment) => {
          return <Comment 
          comment={comment}
          key={comment.id}
          setAllComments={setAllComments}
          post={post}
        />
        })}
      </div>
      <div className="comments-side">
        <button 
          onClick={() => setShowComments(false)}
          className="close">
            <img src='https://img.icons8.com/?size=512&id=66767&format=png' width='30px'/>
        </button>
      </div>
    </div>
  )

}