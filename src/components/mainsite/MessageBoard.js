import Conversations from './Conversations'
import { useParams } from "react-router"
import { getToken, loadUserData } from '../../helperFunctions/Helper'
import { getUser } from "../../api/UserApis"
import { getAllFriends } from "../../api/FriendshipApis"
import { useState, useEffect } from 'react'
import MessageFriends from './MessageFriends'

const user = loadUserData()
export default function MessageBoard() {
  const [ otherUser, setOtherUser ] = useState('')
  const [ allFriends, setAllFriends ] =useState([])
  const { id } = useParams()

  useEffect(() => {
    if(id !== '0'){
      getUser(user.id, id)
      .then(response => response.json())
      .then(data => {
        setOtherUser(data.user.username)
      })}

      getAllFriends(user.id)
        .then(response => response.json())
        .then(data => {
          setAllFriends(data.friends)
        })
  }, [id])

  return (
    <>
      <div>
        <h3 className='message-board-title'>{id !== '0' ? otherUser: 'Message Board'}</h3>
      </div>
      <div className='message-board'>
        <aside className='message-friends'>
          <MessageFriends friends={allFriends}/>
        </aside>
        <div className='messages-area'>
          {/* display the conversation of a given user */}
          <Conversations otherUserId={id} token={getToken()} currentUserId = {user.id}/>
        </div>
        <aside></aside>
      </div>
    </>
  )
}