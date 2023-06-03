import { useState } from "react"
import { searchUsers } from "../../api/UserApis"
import Friends from "./Friends"

export default function FindFriends() {
  const [ searchField, setSearchField ]= useState({
  searchArea: "",
  searchCriteria: ""
})
  const [ allPossibleAnswers, setAllPossibleAnswers ] = useState([])

  const handleChangeSearchField = (e) => {
    setSearchField({...searchField, [e.target.name]: e.target.value})
  }

  const findSomeFriends = (e) => {
    e.preventDefault()
    searchUsers(searchField.searchCriteria, searchField.searchArea)
    .then((res) => res.json())
    .then((data) => setAllPossibleAnswers(data))
  }

  return (
    <div>
      <h2>Find Friends</h2>
      <form
      onSubmit={findSomeFriends}
      >
        <label htmlFor='search'>Search: </label>
        <select id='search' defaultValue='none'
        onChange={handleChangeSearchField}
        name='searchArea'
        >
          <option
          value='none' disabled hidden
          >Select an Option</option>
          <option
          value='username'
          >Username</option>
          <option
          value='name'
          >Name</option>
          <option
          value='hometown'
          >Hometown</option>
        </select>
        <input 
        type='text'
        placeholder="Search for friends"
        name='searchCriteria'
        onChange={handleChangeSearchField}
        />
        <button type='submit'>Find</button>
      </form>

      <Friends 
      allPossibleAnswers={allPossibleAnswers}
      />
    </div>
  )
  }