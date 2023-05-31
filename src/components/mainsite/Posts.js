import Post from "./Post";

export default function Posts({ userPostsList }) {
  return(
    <div>
    {userPostsList.length? userPostsList.map((post) => {
      return <Post 
      post={post}
      key={post.id}
      /> 
      }): null}
      </div>
  )
}