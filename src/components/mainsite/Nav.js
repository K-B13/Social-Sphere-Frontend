import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/UserApis";

export default function Nav() {
  const navigate = useNavigate();
  const logout = () => {
    logoutUser(JSON.parse(localStorage.getItem('Auth Token')))
    .then(() => {
    navigate('/')
    })
  }
  return(
    <nav className="nav-bar">
      <Link className="nav-link" to="/MainSite"><img src='https://img.icons8.com/?size=2x&id=rJe96vXFGcP6&format=png' width='35px' /></Link>
      
      <Link className="nav-link" to='/FindFriends'>Find Friends</Link>

      <Link className="nav-link" to='/Requests'>Requests</Link>
      
      <Link className="nav-link" to='/MyProfile'>My Profile</Link>
      
      <Link className="nav-link" to='/EditUser'> 
      <img src='https://img.icons8.com/?size=2x&id=ywULFSPkh4kI&format=png' width='40px' /> 
      </Link>
      <button
      onClick={logout}
      >Log Out</button>
    </nav>
  )
}