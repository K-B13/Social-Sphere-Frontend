import Friend from "./Friend"
import { loadUserData } from "../../helperFunctions/Helper"

export default function Friends({ allPossibleAnswers }) {
  // Receieves an array of users as a prop. This array will be mapped over creating a user component for each user in the array.
  return(
    <div className="friends">
    {allPossibleAnswers.length ? 
    allPossibleAnswers.map(friendInfo => {
      // maps over all the users creating a friend component with that user's data. If one of the usernames matches the logged in user then a friend component is not created for that user in the array.
      return loadUserData().username !== friendInfo.username ? <Friend friendInfo={friendInfo} key={friendInfo.id} />: null
    })
    : null}
    </div>
  )

}