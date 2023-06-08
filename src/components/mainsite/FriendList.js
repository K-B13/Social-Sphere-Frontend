import { Link } from "react-router-dom"
import { loadUserData } from "../../helperFunctions/Helper"
export default function FriendList({ sampleFriends, userId }) {
return(
  <div className="friend-list">
    <h3>Friends</h3>
    <div className="sample-friend-list">
  { sampleFriends.length ? sampleFriends.map(friend => {
  return(<div
  className="friend-username"
  key = {friend.id}
  >
    <Link to={friend.id === loadUserData().id ? `/MyProfile` :`/${friend.id}`} >
    <p>{friend.username}</p>
    </Link>
    {/* <p>{friend.name}</p> */}
  </div>)
  }): null}
  </div>

  {sampleFriends.length > 0 ? <Link to={`/AllFriends/${userId}`} > All Friends</Link>: null}
  </div>
)
}