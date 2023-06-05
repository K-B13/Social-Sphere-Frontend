import { getAllFriends } from "../../api/FriendshipApis"
import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import Friends from "./Friends"

export default function AllFriends() {

  const [ listAllFriends, setListAllFriends ] = useState({
    user: {},
    friends: []
  })
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getAllFriends(id)
    .then((res) => res.json())
    .then((data) => {
      setListAllFriends(data)
  })
  }, [])

  const redirectFindFriends = () => {
    navigate('/FindFriends')
  }

  return(
    <div>
      <h2>{listAllFriends.user? `${listAllFriends.user.username}'s Friends`: null}</h2>

      <button
      onClick={redirectFindFriends}
      >Find Friends</button>

      {listAllFriends.friends ? <Friends
      allPossibleAnswers={listAllFriends.friends}
      />: null}
    </div>
  )
}