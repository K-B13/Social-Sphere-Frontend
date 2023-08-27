import { useEffect, useState } from "react";
import { getAllSentRequests } from "../../api/FriendRequestApis";
import ReceivedRequests from "./ReceivedRequests";
import SentRequests from "./SentRequests";
import { loadUserData } from "../../helperFunctions/Helper";

export default function RequestPage() {

  // State that holds all requests both sent and received that will be populated from the back end.
  const [ allRequests, setAllRequests ] = useState({
    receivedRequests: [],
    sentRequests: []
  })

  // Use effect that happens once on page load which calls a function that retrieves all the requests for the logged in user and stores it in the state that holds all requests.
  useEffect(() => {
    getAllSentRequests(loadUserData().id)
    .then((res) => res.json())
    .then((data) => {
      setAllRequests(data)})
  }, [])

  return(
  <div className="request-screen">

    {/* Mounts the received request component and passes down all received requests, the current user, and the ability to change the all requests state so the received requets can handle accepting and rejecting requests */}
    <div className="requests">
      <h3>Received Friend Requests</h3>
      <ReceivedRequests
      allReceived = {allRequests.receivedRequests}
      user={allRequests.user}
      setAllRequests={setAllRequests}
      />
    </div>

    {/* Mounts the sent request component and passes down all sent requests, the current user, and the ability to change the all requests state so the received requets can handle rescinding requests */}
    <div className="requests">
      <h3>Sent Friend Requests</h3>
      <SentRequests 
      allSent = {allRequests.sentRequests}
      user={allRequests.user}
      setAllRequests={setAllRequests}
      />
    </div>
  </div>
  )
}