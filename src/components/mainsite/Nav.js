import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/UserApis";
import { Logo, Search, Request, Message, ProfilePic, LogOut } from '../../pictures/index.js'

export default function Nav() {
  // Stores the useNavigate in a variable called navigate
  const navigate = useNavigate();

  // Function that will log a user out. It calls the logout user function which makes a call to the backend. It is passed the token from local storage. Afterwards the user is navigated back the login page.
  const logout = () => {
    logoutUser(JSON.parse(localStorage.getItem('Auth Token')))
    .then(() => {
    navigate('/')
    })
  }

  return(
    <nav className="nav-bar">
      <div className="nav-bar-logo-container">
      <Link to="/MainSite"><img src={Logo} width='30px'
      className="nav-bar-logo"
      /></Link>
      <Link to="/MainSite"
      className="nav-bar-title"
      >The Social Sphere</Link>
      
      </div>
      <div className="nav-bar-items">
      <Link className="nav-link" to='/FindFriends'>
        <img src={Search}
        width='30px'
        />
      </Link>

      <Link className="nav-link" to='/Requests'>
        <img src={Request}
        width='30px'
        />
      </Link>
      
      <Link className="nav-link" to='/MessageBoard/0' >
        <img src={Message}
        width='30px'
        />
      </Link>

      <Link className="nav-link" to='/MyProfile'>
        <img src={ProfilePic}
        width='30px'
        />
      </Link>
      
      <button
      className="logout-btn"
      onClick={logout}
      >
        <img src={LogOut}
        width='30px'
        />
      </button>
      </div>
    </nav>
  )
}