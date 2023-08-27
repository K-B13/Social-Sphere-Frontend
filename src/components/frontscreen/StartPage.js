import Login from "./Login"
import SignUp from "./SignUp"
import { useState } from "react"
import { createUser, loginUser } from "../../api/UserApis";
import { useNavigate } from "react-router";
import { Logo } from '../../pictures/index.js'

export default function StartPage() {
  // State that will render either the login page or the signup page depending on if it is true or false
  const [ needSignUp, setNeedSignUp ] = useState(false)

  // State that stores what the user types into the input boxes 
  const [ userDetails, setUserDetails ] = useState({
    email: "",
    password: "",
    username: ""
  })

  // State that handles whether or not the error message will appear
  const [errorMessageStatus, setErrorMessageStatus] = useState(false)

  // State that handles what the error message will say
  const [ errorMessage, setErrorMessage] = useState("")

  // State that handles whether or not the password is visable.
  const [ hidePassword, setHidePassword ] = useState(true)

  // Storing useNavigate in a variable to use later
  const navigate = useNavigate()
  
  // Function to handle the onChange of input boxes that pertain to logging in or signing up. Whatever is typed into the box is passed as the value and the key is the name on the input box. This is used to update the userDetails state.
  const handleSubmit =  (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value})
  }

  // Function for creating a new user. Calls the createUser function which makes the call to the backend and passes it the User details as a parameter. Then converts the reply from json if the account was created the user is navigated back to login page. If there was a problem the error message is stored in the error message and the error message status is set to true so it appears.
  const newUser = (e) => {
    e.preventDefault()
    createUser(userDetails)
    .then(res => res.json())
    .then((res) => {
      if (res.data) setNeedSignUp(false)
      else {
        setErrorMessage(res.status.message)
        setErrorMessageStatus(true)
      }
    })
    // Housekeeping - reseting the user details to nothing.
    .then(() => setUserDetails({email:"",password:"", username: ""}))
  }

  // Function for handling a user loggin in. Calls the login user function that makes a request top the backend to login in the user with the details provided. If the login is successful the Auth token received from the backend is stored in local storage and the suer is navigated onto the main site. If there is an error the error message displays with the set message.
  const returningUser = (e) => {
    e.preventDefault()
    loginUser(userDetails)
    .then((response) => {
      if (response.ok) {
      localStorage.setItem('Auth Token', JSON.stringify(response.headers.get('Authorization')))
      navigate('/MainSite')
    }
      else {
        setErrorMessage('Invalid Email or Password')
        setErrorMessageStatus(true)
      }
    })
  }

  return(
    <div className="start-screen">
    <div className="start-title-container">
      <div className="start-logo">
        <img src={Logo} width='100px' height='100px' />
      </div>
      <h1 className="start-title">The Social Sphere</h1>
    </div>
    {/* If the needSignUp state is true the Sign up page is shown if it is false the login page is shown. */}
      {needSignUp? 
      <SignUp 
      newUser={newUser}
      handleSubmit={handleSubmit}
      userDetails={userDetails}
      errorMessage={errorMessage}
      errorMessageStatus={errorMessageStatus}
      setNeedSignUp={setNeedSignUp}
      setErrorMessageStatus={setErrorMessageStatus}
      />:
      <Login  
      setNeedSignUp={setNeedSignUp}
      userDetails={userDetails}
      returningUser={returningUser}
      errorMessage={errorMessage}
      errorMessageStatus={errorMessageStatus}
      handleSubmit={handleSubmit}
      setErrorMessageStatus={setErrorMessageStatus}
      hidePassword={hidePassword}
      setHidePassword={setHidePassword}
      />}
      {/* This is where the error message will display if error message status is true.  */}
    <div className="start-error">
      {errorMessageStatus? <div className='error-message'>
      {errorMessage}
      </div>
      : null}
    </div>
    </div>
  )
}