import { Link } from "react-router-dom"
import { loadUserData } from "../../helperFunctions/Helper"
export default function FriendList({ sampleFriends, userId }) {
return(
  <div>
  { sampleFriends.length ? sampleFriends.map(friend => {
  return(<div
  key = {friend.id}
  >
    <Link to={friend.id === loadUserData().id ? `/MyProfile` :`/${friend.id}`} >
    <p>{friend.username}</p>
    </Link>
    <p>{friend.name}</p>
  </div>)
  }): null}

  <Link to={`/AllFriends/${userId}`} > ...</Link>
    <hr />
  </div>
)
}