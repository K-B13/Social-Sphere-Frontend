import Post from "./Post";

export default function Posts({ userPostsList, setList }) {
  return(
    <div className="post-container">
    {userPostsList.length? userPostsList.map((post, index) => {
      return <Post 
      post={post}
      key={post.id}
      setList={setList}
      userPostsList={userPostsList}
      index={index}
      /> 
      }): null}
      </div>
  )
}