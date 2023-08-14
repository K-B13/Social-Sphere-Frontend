import { useNavigate } from "react-router"

export default function MessageFriends({ friends }) {
  const navigate = useNavigate()
  return (
    <div>
      <h4>Friends</h4>
      {friends.map((friend, index) => {
        return (
        <div key={friend.id}
        className={index % 2 === 0 ? 'odd-friend': 'even-friend'}
        >
          <button
            onClick={() => navigate(`/messageBoard/${friend.id}`)}
          >
            {friend.username}
          </button>
        </div>)
      })}
    </div>
  )

}