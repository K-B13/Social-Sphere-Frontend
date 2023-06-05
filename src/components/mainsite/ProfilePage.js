import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { getUser } from "../../api/UserApis"
import UserInformation from "./UserInformation"
import FriendList from "./FriendList"
import { loadUserData } from "../../helperFunctions/Helper"
import { createRequest } from "../../api/FriendRequestApis"
import { deleteFriendship } from "../../api/FriendshipApis"

export default function ProfilePage() {
  const [ userInformation, setUserInformations ] = useState({})
  const [ hasFriendRequest, setHasFriendRequest ] = useState(true)
  const [ isFriend, setIsFriend ] = useState(false)

  const { userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getUser(loadUserData().id, userId)
    .then((res) => res.json())
    .then((data) => {
      if (data.user.username === loadUserData().username) navigate('/MyProfile')
      else {
        setHasFriendRequest(data.hasFriendRequest)
        setIsFriend(data.isFriend)
        setUserInformations(data)}
    })
  }, [])

  const unFriend = () => {
    console.log(userInformation.currentUser)
    console.log(userInformation.user)
    deleteFriendship(userInformation.currentUser.id, userInformation.user.id)
    .then(() => setIsFriend(false))
  }

  const sendARequest =() => {
    createRequest(loadUserData().id, userId)
    .then((response) => response.json())
    .then((data) => {
      console.log(data, 'test')})
  }

  return(
    <div>
      {userInformation.user ? <div><UserInformation 
      userDetails={userInformation.user}
      />
      <FriendList 
      sampleFriends={userInformation.friends}
      /> </div> : null}

      {!hasFriendRequest && 
      !isFriend &&
      <button
      onClick={() => {
        setHasFriendRequest(true)
        sendARequest()}}
      >Send Friend Request</button>
      }
      {!hasFriendRequest && isFriend ?
      <button
      onClick={unFriend}
      >Unfriend</button>:
      null
      }
    </div>
  )

}