import React, { useState, useEffect, Component } from 'react'
import { getMessages, sendMessage } from '../../api/MessagesApi'
import { miniApiUrl } from '../../api/ApiConfig'
import ActionCable from 'actioncable'
// import { ActionCableConsumer, ActionCableProvider } from 'react-actioncable-provider'



export default function Conversations({ otherUserId, token, currentUserId }) {
  const cable = ActionCable.createConsumer(`ws://${miniApiUrl}/cable`)
  const [ messageInput, setMessageInput ] = useState('')
  const [ messages, setMessages ] = useState([])
  const [ otherUser, setOtherUser ] = useState('')

  useEffect(() => {
    getMessages(otherUserId, token)
      .then((response) => response.json())
      .then(data => {
        setMessages(data)})

    const subscription = cable.subscriptions.create({
      channel: 'ConversationsChannel', convo_name: currentUserId
    },
    {
      received(data){
        setMessages(prevMessages => [...prevMessages, data]);
      }
    }
    ) 
    return () => {
      subscription.unsubscribe();
    };
  }, [otherUserId, token, currentUserId]);
  
  const handleMessageInput = (e) => {
    setMessageInput(e.target.value);
  }

  const submitMessage = (e) => {
    e.preventDefault();
    sendMessage(messageInput, otherUserId, token)
  }

  return (
    
    <div >
      <div className='message-container'>
      {messages.map((message) => {
        return (
        <div 
          className={message.user_id === currentUserId ? 'sent-message' : 'received-message'}
          key={message.id}>
            <p>{message.content}</p>
            <p>{message.user_id === currentUserId ? 'You': message.recipient_id}</p>
        </div>)
      })}
      </div>
      <form
        onSubmit={submitMessage}
      >
        <input type='text' className='input' 
        value = {messageInput}
        onChange={handleMessageInput}
        />
        <button
        type='submit'
        >Send</button>
      </form>
      <button
      onClick={() => console.log(messages)}
      >Test</button>
    </div>
  )
}