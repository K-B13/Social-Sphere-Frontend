import { useEffect, useState } from "react"
import { userPosts } from "../../api/PostApis"
import Posts from "./Posts"
import UserInformation from "./UserInformation"
import FriendList from "./FriendList"
import CreatePostForm from "./CreatePostForm"
import { retrieveFriends } from "../../api/FriendshipApis"


export default function MyProfile() {
const [ userPostsList, setUserPostsList ] = useState({
  userPosts: [],
  posts: []
})
const [ userDetails, setUserDetails ] = useState({})
const [ typeOfPost, setTypeOfPost ] = useState(0)
const [ sampleFriends, setSampleFriends ] = useState([])
const [ sidebar, setSidebar ] = useState(false)

  useEffect(() => {
    const userInfo =JSON.parse(localStorage.getItem('User Info'))
    userPosts(userInfo.id)
    .then((res) => res.json())
    .then((data) => {
      setUserDetails(userInfo)
      setUserPostsList(data.data)})
    retrieveFriends(userInfo.id)
    .then((res) => res.json())
    .then((data) => setSampleFriends(data))
  }, [])

  const showStatusUpdates = () => {
    setTypeOfPost(1)
  }

  const showImagePost = () => {
    setTypeOfPost(2)
  }
  return (
    <div>
      <h2 className="mp-title">{`${JSON.parse(localStorage.getItem('User Info')).username}'s Page`}</h2>
      <div className='user-display'>
      <UserInformation 
      userDetails={userDetails}
      sidebar={sidebar}
      setSidebar={setSidebar}
      />
      
      <FriendList 
      sampleFriends={sampleFriends}
      userId={userDetails.id}
      sidebar={sidebar}
      setSidebar={setSidebar}
      />

    </div>
      <div>
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
      setUserPostsList={setUserPostsList}
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
          className="close-comment">
            <img src='https://img.icons8.com/?size=512&id=66767&format=png' width='30px'/>
      </button>
          
        </div>
      </div>
      : 
      null}
      <hr />
      <Posts
      setList= {setUserPostsList} 
      userPostsList = {userPostsList.userPosts}
      />
    </div>
  )
  }