import { respondToFriendRequest } from "../../api/FriendRequestApis"

export default function ReceivedRequests({ allReceived, user, setAllRequests }){

  // function to handle accepting or rejecting requests. The function respondToFriendRequest is called with the parameters of the current user the request in question and a string of 'accept' or 'reject'. This function makes a call to the backend updating that request and the backend will return all the requests that will be used to update the total requests
  const dealWithRequest = (status, request) => {
    respondToFriendRequest(user, request.id, status)
    .then((res) => res.json())
    .then((data) => setAllRequests(data))
  }

  return(
    <div className="receiver-requests">
      {/* Checks if their is anything in the allRecieved array if there is it maps over them else nothing happens. */}
      {allReceived.length ? allReceived.map(request => {
      return (
      <div
      className="received"
      key={request.id}>

        {/* If the sender of the request is there then it will display the senders name else it will display N/A */}
        <p>
          {request.sender.name? request.sender.name: 'N/A'}
        </p>
        <p>

          {/* Displays the senders username */}
          {request.sender.username}
        </p>
        <div 
        // Calls the dealWithRequest function with the status of 'accept' and the information about the related request
        className="received-btns">
        <button
        className="accept"
        onClick = {() => {
          dealWithRequest('accept', request)
        }
      }
        >Accept</button>
        
          {/* Calls the dealWithRequest function with the status of 'reject' and the information about the related request */}
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