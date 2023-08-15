import { useState } from "react"
import { createPosts } from "../../api/PostApis"

export default function CreatePostForm({ setUserPostsList, setTypeOfPost }) {
  const [ commentForm, setCommentForm ] = useState("")

  const handleChange = (e) => {
    setCommentForm(e.target.value)
  }

  const brandNewPost = (e) => {
    e.preventDefault()
    createPosts(JSON.parse(localStorage.getItem('User Info')).id, commentForm)
    .then((res) => res.json())
    .then((data) => {
      // setRevealPost(false)
      setTypeOfPost(0)
      setUserPostsList(data)
    })
  }
  return(
    <div className="create-post">
      <div
      className="post-side"
      ></div>
    <form 
    className="create-post-form"
    onSubmit={brandNewPost}
    >
      <label>Your Message</label>
      <textarea
      onChange={handleChange}
      value={commentForm}
      type='text-box'
      className="post-description"
      rows="22" cols="35"
      placeholder='Write your message here...'
      />
      <div className='wrap'>
        <button
        className="post-btn"
        type='submit'
        >Post Message</button>
      </div>
    </form>
    <div
    className="post-side"
    ><button 
    onClick={() => setTypeOfPost(0)}
    className="close">
        <img src='https://img.icons8.com/?size=512&id=66767&format=png' width='30px'/>
      </button>
    </div>
    </div>
  )
}