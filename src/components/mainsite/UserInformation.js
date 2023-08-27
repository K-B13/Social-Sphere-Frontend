import { Link } from "react-router-dom"
import { loadUserData, transformDate } from "../../helperFunctions/Helper"
import Hamburger from '../../hamburger.png'

export default function UserInformation({ userDetails, sidebar, setSidebar }) {
  return(
    <div className="user-information">
      <div className="hamburger-placement">
        <h3>{userDetails.username}'s Information</h3>
        {sidebar ? 
        <button className='profile-hamburger'></button>: 
        <button
        onClick={() => setSidebar(true)}
        className='profile-hamburger'
        >
          <img src={Hamburger} width='20px' />
        </button>}
        </div>

      <p>Name: {userDetails.name ? userDetails.name: 'N/A'}</p>
      <p>Hometown: {userDetails.hometown ? userDetails.hometown: 'N/A'}</p>
      <p>Bio: {userDetails.bio ? userDetails.bio: 'N/A'}</p>
      <p>Date of Birth: {userDetails.dob ? transformDate(userDetails.dob): 'N/A'}</p>
      
      {userDetails.id === loadUserData().id ? <Link to='/EditUser'>
        <img src = 'https://img.icons8.com/?size=512&id=12082&format=png' width='20px' />
        </Link>: <div></div>}
    </div>
  )
}