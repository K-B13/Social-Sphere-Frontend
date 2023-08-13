import Conversations from './Conversations'
import { useParams } from "react-router"
import { getToken, loadUserData } from '../../helperFunctions/Helper'

export default function MessageBoard() {
  const { id } = useParams()
  
  return (
    <>
      <div>
        <h3></h3>
      </div>
      
      <div className='message-board'>
        <div>
          {/* List of friends need to have access to their id */}
        </div>
        {/* display the conversation of a given user */}
        <Conversations otherUserId={id} token={getToken()} currentUserId = {loadUserData().id}/>
      </div>
    </>
  )
}