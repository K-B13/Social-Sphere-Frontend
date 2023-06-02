import { useState } from "react"
import { updateUser } from "../../api/UserApis"
import { loadUserData, setUserData } from "../../helperFunctions/Helper"
import { useNavigate } from "react-router"

export default function EditUser() {
  const [ newUserInfo, setNewUserInfo ] = useState({
    username: loadUserData().username,
    name: `${loadUserData().name ? loadUserData().name: null}`,
    hometown: `${loadUserData().hometown ? loadUserData().hometown: null}`,
    bio: `${loadUserData().bio ? loadUserData().bio: null}`,
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
    onSubmit={submitUserChanges}
    >
      <label>Username</label>
      <input 
      onChange={handleChange}
      value={newUserInfo.username}
      name='username'
      autoComplete="off"
      />
      <label>Name</label>
      <input 
      onChange={handleChange}
      value={newUserInfo.name}
      name='name'
      autoComplete="off"
      />
      <label>Hometown</label>
      <input 
      onChange={handleChange}
      value={newUserInfo.hometown}
      name='hometown'
      autoComplete="off"
      />
      <label>Bio</label>
      <input 
      onChange={handleChange}
      value={newUserInfo.bio}
      name='bio'
      autoComplete="off"
      />
      <label>Date of Birth</label>
      <input 
      type='date'
      onChange={handleChange}
      value={newUserInfo.dob}
      name='dob'
      />
      <button
      type='submit'
      >Confirm</button>
    </form>
  )
}