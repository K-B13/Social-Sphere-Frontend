import { Link } from "react-router-dom"
export default function FriendList({ sampleFriends }) {
return(
  <div>
  { sampleFriends.length ? sampleFriends.map(friend => {
  return(<div
  key = {friend.id}
  >
    <p>{friend.name}</p>
    <p>{friend.username}</p>
  </div>)
  }): null}
  <Link to="/AllFriends" > ...</Link>
    <hr />
  </div>
)
}