import { respondToFriendRequest } from "../../api/FriendRequestApis"

export default function ReceivedRequests({ allReceived, user, setAllRequests }){
  const dealWithRequest = (status, request) => {
    respondToFriendRequest(user, request.id, status)
    .then((res) => res.json())
    .then((data) => setAllRequests(data))
  }

  return(
    <div className="receiver-requests">
      {allReceived.length ? allReceived.map(request => {
      return (
      <div
      className="received"
      key={request.id}>
        <p>
          {request.sender.name? request.sender.name: 'N/A'}
        </p>
        <p>
          {request.sender.username}
        </p>
        <div className="received-btns">
        <button
        className="accept"
        onClick = {() => {
          dealWithRequest('accept', request)
        }
      }
        >Accept</button>
        <button
        className="reject"
        onClick = {() => {
          dealWithRequest('reject', request)
        }
      }
        >Reject</button>
        </div>
      </div>
      )
      }) : null}
    </div>
  )
}