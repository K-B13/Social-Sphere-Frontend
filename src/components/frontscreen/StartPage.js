import Login from "./Login"
import SignUp from "./SignUp"
import { useState } from "react"
import { createUser, loginUser } from "../../api/UserApis";

export default function StartPage() {
  const [ startMessage, setStartMessage ] = useState(0)
  const [ userDetails, setUserDetails ] = useState({
    email: "",
    password: ""
  })

  const handleSubmit =  (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value})
  }

  const newUser = (e) => {
    e.preventDefault()
    createUser(userDetails).then(() => setUserDetails({email:"",password:""}))
  }

  const returningUser = (e) => {
    e.preventDefault()
    loginUser(userDetails).then(() => setUserDetails({email:"",password:""}))
    .then(() => console.log('Signed In'))
  }
  return(
    <div>
      <h2>Social Sphere</h2>
      <div>
        <button onClick={() => setStartMessage(1)}>Login</button>
        <button onClick={() => setStartMessage(2)}>SignUp</button>
      </div>
      <div>
        {startMessage === 0? <p>Message about app....</p>: null}
        {startMessage === 1? <Login 
        handleSubmit={handleSubmit}
        returningUser={returningUser}
        userDetails={userDetails}
        />: null}
        {startMessage === 2? <SignUp 
        handleSubmit={handleSubmit}
        newUser={newUser}
        userDetails={userDetails}
        />: null}
      </div>
    </div>
  )
}