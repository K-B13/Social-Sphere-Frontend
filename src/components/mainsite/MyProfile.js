import { useEffect, useState } from "react"
import { userPosts } from "../../api/PostApis"
import Posts from "./Posts"
import UserInformation from "./UserInformation"
import FriendList from "./FriendList"

export default function MyProfile() {
const [ userPostsList, setUserPostsList ] = useState([])
  useEffect(() => {
    const userInfo =JSON.parse(localStorage.getItem('User Info'))
    userPosts(userInfo.id)
    .then((res) => res.json())
    .then((data) => setUserPostsList([...data.data]))
  }, [])

  return (
    <div>
      <h2>{`${JSON.parse(localStorage.getItem('User Info')).email}'s Page`}</h2>
      <UserInformation />
      <FriendList />
      <Posts 
      userPostsList = {userPostsList}
      />
    </div>
  )
  }