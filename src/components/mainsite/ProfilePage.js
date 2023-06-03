import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { getUser } from "../../api/UserApis"
import UserInformation from "./UserInformation"
import FriendList from "./FriendList"
import { loadUserData } from "../../helperFunctions/Helper"
import { createRequest } from "../../api/FriendRequestApis"

export default function ProfilePage() {
  const [ userInformation, setUserInformations ] = useState({})
  const { userId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    getUser(loadUserData().id, userId)
    .then((res) => res.json())
    .then((data) => {
      console.log(loadUserData().id)
      console.log(data)
      if (data.user.username === loadUserData().username) navigate('/MyProfile')
      else setUserInformations(data)})
  }, [])

  const sendARequest =() => {
    createRequest(loadUserData().id, userId)
    .then((response) => response.json())
    .then((data) => console.log(data))
  }

  return(
    <div>
      {userInformation.user ? <div><UserInformation 
      userDetails={userInformation.user}
      />
      <FriendList /> </div> : null}
      {!userInformation.isFriend && !userInformation.hasFriendRequest && 
      <button
      onClick={sendARequest()}
      >Add Friend</button>
      }
    </div>
  )

}