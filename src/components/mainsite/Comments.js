import { useEffect, useState } from "react"
import { postComments } from "../../api/CommentApis"
import Comment from './Comment'

export default function Comments({ user_id, post_id, userPostsList, allComments, setAllComments, post }){
  
  useEffect(() => {
    postComments(user_id, post_id)
    .then((res) => res.json())
    .then((data) => {
      setAllComments([...data.data])})
  }, [userPostsList])
  return(
    <div>
      {allComments.map((comment) => {
        return <Comment 
        comment={comment}
        key={comment.id}
        setAllComments={setAllComments}
        post={post}
        />
      })}
    </div>
  )

}