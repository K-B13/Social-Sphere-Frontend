import { useState } from "react"
import { updateUser } from "../../api/UserApis"
import { loadUserData, setUserData } from "../../helperFunctions/Helper"
import { useNavigate } from "react-router"

export default function EditUser() {

  // State to store all the user data in an object to allow the user to edit it.
  const [ newUserInfo, setNewUserInfo ] = useState({
    name: `${loadUserData().name ? loadUserData().name: 'N/A'}`,
    hometown: `${loadUserData().hometown ? loadUserData().hometown: 'N/A'}`,
    bio: `${loadUserData().bio ? loadUserData().bio: 'N/A'}`,
    dob: `${loadUserData().dob ? loadUserData().dob: null}`
  })

  // Store useNavigate in a variable
  const navigate = useNavigate()

  // Function to handle the change in the inputs fields.
  const handleChange = (e) => {
    setNewUserInfo({...newUserInfo, [e.target.name]: e.target.value})
  }

  // Function to change the user information. The updateUser function is called updating the user information with the changes to the information.
  const submitUserChanges = (e) => {
    e.preventDefault()
    updateUser(loadUserData().id, newUserInfo)
    .then((res) => res.json())
    .then((data) => setUserData(data))
    .then(() => navigate('/MyProfile'))
  }

  return (
    <div className="edit-form-container">
      <form
      className="edit-form"
      // calls the function that submits the changes to the user information.
      onSubmit={submitUserChanges}
      >
        {/* Edit name section which will update the name information in the newUserInfo state */}
        <div className="edit-section">
          <label>Name</label>
          <input 
          onChange={handleChange}
          value={newUserInfo.name}
          name='name'
          autoComplete="off"
          />
        </div>

        {/* Edit hometown section which will update the hometown information in the newUserInfo state */}
        <div className="edit-section">
          <label>Hometown</label>
          <input 
          onChange={handleChange}
          value={newUserInfo.hometown}
          name='hometown'
          autoComplete="off"
          />
        </div>

         {/* Edit bio section which will update the bio information in the newUserInfo state */}
        <div className="edit-section">
          <label
          className="label-bio"
          >Bio</label>
          <textarea
          className="edit-bio"
          rows='8' cols='25'
          onChange={handleChange}
          value={newUserInfo.bio}
          name='bio'
          autoComplete="off"
          />
        </div>

         {/* Edit DOB section which will update the DOB information in the newUserInfo state */}
        <div className="edit-section">
          <label>Date of Birth</label>
          <input 
          type='date'
          onChange={handleChange}
          value={newUserInfo.dob.split("T")[0]}
          name='dob'
          />
        </div>

        {/* Button that handles submitting the information */}
        <button
        className="button-86"
        type='submit'
        >Confirm</button>
      </form>
    </div>
  )
}