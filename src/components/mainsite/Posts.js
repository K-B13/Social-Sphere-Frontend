import Post from "./Post";

export default function Posts({ userPostsList, setUserPostsList }) {
  return(
    <div>
    {userPostsList.length? userPostsList.map((post, index) => {
      return <Post 
      post={post}
      key={post.id}
      setUserPostsList={setUserPostsList}
      userPostsList={userPostsList}
      index={index}
      /> 
      }): null}
      </div>
  )
}