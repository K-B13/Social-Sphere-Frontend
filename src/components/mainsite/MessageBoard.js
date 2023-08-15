import Conversations from './Conversations'
import { useParams } from "react-router"
import { getToken, loadUserData } from '../../helperFunctions/Helper'
import { getUser } from "../../api/UserApis"
import { getAllFriends } from "../../api/FriendshipApis"
import { useState, useEffect } from 'react'
import MessageFriends from './MessageFriends'
import Hamburger from '../../hamburger.png'

import { sendMessage } from '../../api/MessagesApi'

// const user = loadUserData()
// const token = getToken()
export default function MessageBoard() {
  const [ otherUser, setOtherUser ] = useState('')
  const [ allFriends, setAllFriends ] =useState([])
  const [ messageInput, setMessageInput ] = useState('')
  const [ sidebar, setSidebar ] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const user = loadUserData()
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

  const handleMessageInput = (e) => {
    setMessageInput(e.target.value);
  }

  const submitMessage = (e) => {
    e.preventDefault();
    const token = getToken()
    sendMessage(messageInput, id, token)
    setMessageInput('')
  }

  return (
    <>
      <div className='message-title-div'>
        {sidebar ? <button className='hamburger'></button>: <button
        onClick={() => setSidebar(true)}
        className='hamburger'
        >
          <img src={Hamburger} width='20px' />
        </button>}
        <h3 className='message-board-title'>{id !== '0' ? otherUser: 'Message Board'}</h3>
      </div>

      <div className='message-board'>
        <aside className={`message-friends sidebar ${sidebar ? 'open': 'close'}`}>
          <MessageFriends friends={allFriends}
          setSidebar={setSidebar}
          />
        </aside>
        <div className='messages-area'>
          {/* display the conversation of a given user */}
          <Conversations otherUserId={id} token={getToken()} currentUserId = {loadUserData().id}/>
        </div>
        <aside>
        {id === '0' ? null: 
      <form
      className='message-form'
        onSubmit={submitMessage}
      >
        <textarea type='text' className='input' 
        value = {messageInput}
        onChange={handleMessageInput}
        placeholder='Message...'
        rows='25'
        />
        <button
        type='submit'
        className='message-submit'
        >Send</button>
      </form>}
        </aside>
      </div>
    </>
  )
}