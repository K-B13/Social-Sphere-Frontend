import Friend from "./Friend"
import { loadUserData } from "../../helperFunctions/Helper"

export default function Friends({ allPossibleAnswers }) {
  return(
    <div className="friends">
    {allPossibleAnswers.length ? 
    allPossibleAnswers.map(friendInfo => {
      return loadUserData().username !== friendInfo.username ? <Friend friendInfo={friendInfo} key={friendInfo.id} />: null
    })
    : null}
    </div>
  )

}