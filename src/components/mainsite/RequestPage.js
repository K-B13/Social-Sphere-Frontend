import { useEffect, useState } from "react";
import { getAllSentRequests } from "../../api/FriendRequestApis";
import ReceivedRequests from "./ReceivedRequests";
import SentRequests from "./SentRequests";
import { loadUserData } from "../../helperFunctions/Helper";

export default function RequestPage() {
  const [ allRequests, setAllRequests ] = useState({
    receivedRequests: [],
    sentRequests: []
  })

  useEffect(() => {
    getAllSentRequests(loadUserData().id)
    .then((res) => res.json())
    .then((data) => {
      setAllRequests(data)})
  }, [])

  return(
  <div className="request-screen">
    <div className="requests">
      <h3>Received Friend Requests</h3>
      <ReceivedRequests
      allReceived = {allRequests.receivedRequests}
      user={allRequests.user}
      setAllRequests={setAllRequests}
      />
    </div>
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