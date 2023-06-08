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


  const showStatusUpdates = () => {
    setTypeOfPost(1)
  }

  const showImagePost = () => {
    setTypeOfPost(2)
  }
  
  return(
    <div className="homepage-feed"><div>
        {typeOfPost === 1? null: <button
        className="create-post-icon"
        onClick={showStatusUpdates}
        >
          <img src='https://img.icons8.com/?size=512&id=qIZSSUb_zxBM&format=png' width='20px'/>
        </button>}
        {typeOfPost === 2? null: <button
        className="create-post-icon"
        onClick={showImagePost}
        >
          <img src='https://img.icons8.com/?size=512&id=53433&format=png' width='20px' />
        </button>}
        </div>
      {typeOfPost === 1 ? <CreatePostForm
      setUserPostsList={setUserFeed}
      setTypeOfPost={setTypeOfPost}
      />: null}
      {typeOfPost === 2 ? 
      <div className="image-upload">
        <div className="post-side"></div>
        <div className="post-image">
        <img src='https://img.icons8.com/?size=512&id=33910&format=png' width='100px' />
        <img src='https://img.icons8.com/?size=512&id=8965&format=png' width='90px' />
        </div>
        <div className="post-side">
          <button 
          onClick={() => setTypeOfPost(0)}
          className="close">
            <img src='https://img.icons8.com/?size=512&id=66767&format=png' width='30px'/>
          </button>
          
        </div>
      </div>
      : 
      null}
      
      <Posts 
      setList= {setUserFeed} 
      userPostsList = {userFeed.posts}

      />
    </div>
  )
}