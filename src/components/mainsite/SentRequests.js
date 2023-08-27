import { respondToFriendRequest } from "../../api/FriendRequestApis"

export default function SentRequests({ allSent, user, setAllRequests }){

  // A function that handles rescinding requests that the current user has sent. It calls a function called respondToFriendRequest that makes a request to the backend with the current user, the id of the request in question and the status which in this case would be 'reject'
  const dealWithRequest = (status, request) => {
    respondToFriendRequest(user, request.id, status)
    .then((res) => res.json())
    .then((data) => setAllRequests(data))
  }

  return(
    <div className="sent-requests">

      {/* Checks to see if there are any requests in the allSent array. If there is they will be mapped over creating a request for the user to see else it will be null. */}
      {allSent.length ? allSent.map(request => {
      return (
      <div
      className="sent"
      key={request.id}>

        {/* Displays the receivers name */}
        <p>
          {request.receiver.name}
        </p>

        {/* Displays the receivers username */}
        <p>
          {request.receiver.username}
        </p>
        <button
        className="rescind-btn"
        onClick = {() => {
          // Calls the dealWithRequest with the parameters 'reject' and the information about the relevant request.
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