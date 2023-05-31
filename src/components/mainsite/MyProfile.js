import { useEffect, useState } from "react"
import { userPosts } from "../../api/PostApis"
import Posts from "./Posts"

export default function MyProfile() {
const [ userPostsList, setUserPostsList ] = useState([])
  useEffect(() => {
    const userInfo =JSON.parse(localStorage.getItem('User Info'))
    userPosts(userInfo.id)
    .then((res) => res.json())
    .then((data) => setUserPostsList([...data.data]))
  }, [])
  const renderPosts = userPostsList.map((post) => {
    <Posts />
  })
  return (
    <div>
    <h2>Profile Page</h2>
    {userPostsList.length? renderPosts: null}
    </div>
  )
  }