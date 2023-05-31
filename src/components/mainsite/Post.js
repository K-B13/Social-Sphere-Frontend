export default function Post({ post }) {
  return(
    <div>
    <h3>{post.content}</h3>
    <p>{post.author}</p>
    </div>
  )
}