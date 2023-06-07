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
      {<h2 className="af-title" >{listAllFriends.user ? `${listAllFriends.user.username ? listAllFriends.user.username: "User"}'s Friends`: null}</h2>}

      <button
      className="button-64"
      onClick={redirectFindFriends}
      ><span>Find Friends</span></button>

      {listAllFriends.friends ? <Friends
      allPossibleAnswers={listAllFriends.friends}
      />: null}
    </div>
  )
}