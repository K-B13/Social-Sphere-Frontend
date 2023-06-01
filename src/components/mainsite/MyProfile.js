import { useEffect, useState } from "react"
import { userPosts, createPosts } from "../../api/PostApis"
import Posts from "./Posts"
import UserInformation from "./UserInformation"
import FriendList from "./FriendList"
import CreatePostForm from "./CreatePostForm"

export default function MyProfile() {
const [ userPostsList, setUserPostsList ] = useState([])
const [ revealPost, setRevealPost ] = useState(false)
const [ typeOfPost, setTypeOfPost ] = useState(0)
  useEffect(() => {
    const userInfo =JSON.parse(localStorage.getItem('User Info'))
    userPosts(userInfo.id)
    .then((res) => res.json())
    .then((data) => setUserPostsList([...data.data]))
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
      <h2>{`${JSON.parse(localStorage.getItem('User Info')).email}'s Page`}</h2>
      <UserInformation />
      <FriendList />
      <button
      onClick={showPosts}
      >{revealPost? 'Hide CreatePost': 'Create Post'}</button>
      {revealPost ? <div>
        <button
        onClick={showStatusUpdates}
        >Status Update</button>
        <button
        onClick={showImagePost}
        >Post Image</button>
        </div>: null}
      {typeOfPost === 1 ? <CreatePostForm />: null}
      {typeOfPost === 2 ? "Work in progress": null}
      <hr />
      <Posts 
      userPostsList = {userPostsList}
      />
    </div>
  )
  }