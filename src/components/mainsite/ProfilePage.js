import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { getUser } from "../../api/UserApis"
import UserInformation from "./UserInformation"
import FriendList from "./FriendList"
import { loadUserData } from "../../helperFunctions/Helper"
import { createRequest } from "../../api/FriendRequestApis"
import { deleteFriendship } from "../../api/FriendshipApis"
import Posts from "./Posts"
import { Link } from "react-router-dom"

export default function ProfilePage() {
  const [ userInformation, setUserInformations ] = useState({})
  const [ hasFriendRequest, setHasFriendRequest ] = useState(true)
  const [ isFriend, setIsFriend ] = useState(false)
  const [ userPostsList, setUserPostsList ] = useState([])

  const [ sidebar, setSidebar ] = useState(false)

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
        setUserPostsList(data.posts)
        setUserInformations(data)}
    })
  }, [userId])

  const unFriend = () => {
    deleteFriendship(userInformation.currentUser.id, userInformation.user.id)
    .then(() => setIsFriend(false))
  }

  const sendARequest =() => {
    createRequest(loadUserData().id, userId)
  }

  return(
    <div>
        {userInformation.user ? <div className="user-display"><UserInformation 
        userDetails={userInformation.user}
        sidebar={sidebar}
        setSidebar={setSidebar}
        />

        <FriendList 
        sampleFriends={userInformation.friends}
        userId={userInformation.user.id}
        sidebar={sidebar}
        setSidebar={setSidebar}
        /> </div> : null}

      {!hasFriendRequest && 
      !isFriend &&
      <button
      className="unfriend"
      onClick={() => {
        setHasFriendRequest(true)
        sendARequest()}}
      >Send Friend Request</button>
      }
      {!hasFriendRequest && isFriend ?
      <button
      className="unfriend"
      onClick={unFriend}
      >Unfriend</button>:
      null
      }
      {isFriend ? <Link to={`/MessageBoard/${userInformation.user.id}`}
      className="unfriend"
      >Message</Link>
      :null
      }
      <Posts
      setUserPostsList= {setUserPostsList} 
      userPostsList = {userPostsList}
      />
    </div>
  )

}