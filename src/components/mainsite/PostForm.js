export default function PostForm({ post, handleChange, editedPost }) {

  return(
    <form
    className='post-update-form'
    >
      <textarea
      rows="8" cols="30"
      name='content'
      value={editedPost.content}
      onChange={handleChange}
      />
    </form>
  )
}