import { useEffect, useState } from "react"
import { userPosts } from "../../api/PostApis"
import Posts from "./Posts"
import UserInformation from "./UserInformation"
import FriendList from "./FriendList"
import CreatePostForm from "./CreatePostForm"

export default function MyProfile() {
const [ userPostsList, setUserPostsList ] = useState([])
const [ userDetails, setUserDetails ] = useState({})
const [ revealPost, setRevealPost ] = useState(false)
const [ typeOfPost, setTypeOfPost ] = useState(0)

  useEffect(() => {
    const userInfo =JSON.parse(localStorage.getItem('User Info'))
    userPosts(userInfo.id)
    .then((res) => res.json())
    .then((data) => {
      console.log(userInfo)
      setUserDetails(userInfo)
      setUserPostsList([...data.data])})
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
      <FriendList />
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
      setUserPostsList= {setUserPostsList} 
      userPostsList = {userPostsList}
      />
    </div>
  )
  }