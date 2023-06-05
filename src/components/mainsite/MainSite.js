import { useEffect, useState } from "react";
import { feed } from "../../api/PostApis";
import { currentUser } from "../../api/UserApis"
import { loadUserData } from "../../helperFunctions/Helper";
import Posts from "./Posts";
import CreatePostForm from "./CreatePostForm";
export default function MainSite() {
  const [ userFeed, setUserFeed ] = useState({
    posts: []
  })
  const [ revealPost, setRevealPost ] = useState(false)
  const [ typeOfPost, setTypeOfPost ] = useState(0)

  const loggedInUser = () => {
    currentUser().then((res) => res.json())
    .then((data) => {
      localStorage.setItem('User Info', JSON.stringify(data))})
    // .catch((error) => console.log(error))
  }

  const homeFeed = () => {
    feed(loadUserData().id)
    .then((res) => res.json())
    .then((data) => {
      setUserFeed(data)
    })
  }

  useEffect(() => {
    loggedInUser()
    homeFeed()
  }, [])

  const showPosts = () => {
    setRevealPost(!revealPost)
    setTypeOfPost(0)
  }
  const showStatusUpdates = () => {
    setTypeOfPost(1)
  }

  const showImagePost = () => {
    setTypeOfPost(2)
  }
  
  return(
    <div>
      <h1>Social Sphere</h1>
      <button
      onClick={showPosts}
      >{revealPost? 'Hide CreatePost': 'Create Post'}</button>
      {revealPost ? <div>
        {typeOfPost === 1? null: <button
        onClick={showStatusUpdates}
        >Status Update</button>}
        {typeOfPost === 2? null: <button
        onClick={showImagePost}
        >Post Image</button>}
        </div>: null}
      {typeOfPost === 1 ? <CreatePostForm
      setRevealPost={setRevealPost} 
      setUserPostsList={setUserFeed}
      setTypeOfPost={setTypeOfPost}
      />: null}
      {typeOfPost === 2 ? "Work in progress": null}
      
      <Posts 
      setList= {setUserFeed} 
      userPostsList = {userFeed.posts}

      />
    </div>
  )
}