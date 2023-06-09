import Post from "./Post";
import { useLocation } from "react-router";
export default function Posts({ userPostsList, setList }) {
  const location = useLocation()
  return(
    <div className={location.pathname === '/MainSite' ?"post-container": 'pp-post-container'}>

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