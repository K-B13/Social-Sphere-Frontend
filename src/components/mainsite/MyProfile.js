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
const [ revealPost, setRevealPost ] = useState(false)
const [ typeOfPost, setTypeOfPost ] = useState(0)
const [ sampleFriends, setSampleFriends ] = useState([])

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
  return (
    <div>
      <h2>{`${JSON.parse(localStorage.getItem('User Info')).username}'s Page`}</h2>
      <UserInformation 
      userDetails={userDetails}
      />
      <FriendList 
      sampleFriends={sampleFriends}
      userId={userDetails.id}
      />
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
      setUserPostsList={setUserPostsList}
      setTypeOfPost={setTypeOfPost}
      />: null}
      {typeOfPost === 2 ? "Work in progress": null}
      <hr />
      <Posts
      setList= {setUserPostsList} 
      userPostsList = {userPostsList.userPosts}
      />
    </div>
  )
  }