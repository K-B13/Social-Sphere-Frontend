import { respondToFriendRequest } from "../../api/FriendRequestApis"

export default function SentRequests({ allSent, user, setAllRequests }){

  const dealWithRequest = (status, request) => {
    respondToFriendRequest(user, request.id, status)
    .then((res) => res.json())
    .then((data) => setAllRequests(data))
  }

  return(
    <div className="sent-requests">
      {allSent.length ? allSent.map(request => {
      return (
      <div
      className="sent"
      key={request.id}>
        <p>
          {request.receiver.name}
        </p>
        <p>
          {request.receiver.username}
        </p>
        <button
        className="rescind-btn"
        onClick = {() => {
          dealWithRequest('reject', request)
        }
      }
        >Rescind Request</button>
      </div>
      )
      }) : null}
    </div>
  )
}