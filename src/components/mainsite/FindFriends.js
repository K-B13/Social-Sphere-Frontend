import { useState } from "react"
import { searchUsers } from "../../api/UserApis"
import Friends from "./Friends"

export default function FindFriends() {
  // State to keep track of what the user is searching for and in what field they are searching in
  const [ searchField, setSearchField ]= useState({
  searchArea: "",
  searchCriteria: ""
})
  // State to keep track of the users returned from the backend 
  const [ allPossibleAnswers, setAllPossibleAnswers ] = useState([])

  // Function to handle the change in the input fields for the search. updates the searchField state.
  const handleChangeSearchField = (e) => {
    setSearchField({...searchField, [e.target.name]: e.target.value})
  }

  // function to find the friends from the search criteria. This function uses the search users function to make a request to the backend with the search criteria and the search area as parameters. The response from the backend is stored in a state.
  const findSomeFriends = (e) => {
    e.preventDefault()
    searchUsers(searchField.searchCriteria, searchField.searchArea)
    .then((res) => res.json())
    .then((data) => setAllPossibleAnswers(data))
  }

  return (
    <div>
      <h2
      className="ff-title"
      >Find Friends</h2>
      
      <form
      onSubmit={findSomeFriends}
      >
        <label htmlFor='search'
        className="ff-label"
        >Search: </label>
        <div id='header-container'>

        {/* The select allows the user to change what category they are searching in. */}
        <select id='search' defaultValue='none'
        onChange={handleChangeSearchField}
        name='searchArea'
        >
          {/* The first option is displayed to start with but is not an option in the drop down */}
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
        </div>

        {/* Search bar where the user types in what they are looking for */}
        <input 
        type='text'
        placeholder="Search for friends"
        name='searchCriteria'
        className="ff-input"
        onChange={handleChangeSearchField}
        />
        <button 
        className="button-64"
        type='submit'>
          <span
          className="text"
          >Find</span></button>
      </form>
      
      {/* Renders the friend component and feeds it all the results from the search as a prop */}
      <Friends 
      allPossibleAnswers={allPossibleAnswers}
      />
    </div>
  )
  }