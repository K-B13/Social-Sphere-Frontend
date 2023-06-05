import { respondToFriendRequest } from "../../api/FriendRequestApis"

export default function ReceivedRequests({ allReceived, user, setAllRequests }){
  const dealWithRequest = (status, request) => {
    respondToFriendRequest(user, request.id, status)
    .then((res) => res.json())
    .then((data) => setAllRequests(data))
  }

  return(
    <div>
      {allReceived.length ? allReceived.map(request => {
      return (
      <div
      key={request.id}>
        <p>
          {request.sender.name}
        </p>
        <p>
          {request.sender.username}
        </p>
        <button
        onClick = {() => {
          dealWithRequest('accept', request)
        }
      }
        >Accept</button>
        <button
        onClick = {() => {
          dealWithRequest('reject', request)
        }
      }
        >Reject</button>
      </div>
      )
      }) : null}
    </div>
  )
}