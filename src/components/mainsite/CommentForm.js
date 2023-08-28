import { useState } from "react"
import { updateComment } from "../../api/CommentApis"

export default function CommentForm({ comment, handleChange, editedComment }) {

  return (
    <form>
      <textarea
      className="comment-form"
      rows="8" cols="60"
      name='content'
      value={editedComment.content}
      onChange={handleChange}
      />
    </form>
  )
}