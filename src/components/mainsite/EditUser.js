import { useState } from "react"
import { updateUser } from "../../api/UserApis"
import { loadUserData, setUserData } from "../../helperFunctions/Helper"
import { useNavigate } from "react-router"

export default function EditUser() {
  const [ newUserInfo, setNewUserInfo ] = useState({
    // username: loadUserData().username,
    name: `${loadUserData().name ? loadUserData().name: 'N/A'}`,
    hometown: `${loadUserData().hometown ? loadUserData().hometown: 'N/A'}`,
    bio: `${loadUserData().bio ? loadUserData().bio: 'N/A'}`,
    dob: `${loadUserData().dob ? loadUserData().dob: null}`
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setNewUserInfo({...newUserInfo, [e.target.name]: e.target.value})
  }
  const submitUserChanges = (e) => {
    e.preventDefault()
    updateUser(loadUserData().id, newUserInfo)
    .then((res) => res.json())
    .then((data) => setUserData(data))
    .then(() => navigate('/MyProfile'))
  }

  return (
    <form
    className="edit-form"
    onSubmit={submitUserChanges}
    >
      <div className="edit-section">
        <label>Name</label>
        <input 
        onChange={handleChange}
        value={newUserInfo.name}
        name='name'
        autoComplete="off"
        />
        </div>
        <div className="edit-section">
        <label>Hometown</label>
        <input 
        onChange={handleChange}
        value={newUserInfo.hometown}
        name='hometown'
        autoComplete="off"
        />
        </div>
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
        <div className="edit-section">
        <label>Date of Birth</label>
        <input 
        type='date'
        onChange={handleChange}
        value={newUserInfo.dob.split("T")[0]}
        name='dob'
        />
        </div>
        <button
        className="button-86"
        type='submit'
        >Confirm</button>
    </form>
  )
}