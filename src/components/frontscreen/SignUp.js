export default function SignUp( {newUser, handleSubmit, userDetails, setErrorMessageStatus, setNeedSignUp }) {
  return (
    <div>
      <div className="start-form-container">
        <form  className="start-form"
        // Makes a request to the backend creating the new user with the information from the userDetails object
        onSubmit={newUser}
        >
          <div className="both-signup-inputs">
            <div className="single-signup-input">
              <label>Email</label>
              <input type="text" name="email" placeholder="Type Email here"
              // Updates the userDetails state object with what is  being typed into the email input field 
              onChange={handleSubmit} 
              value= {userDetails.email}
              />
          </div>

          <div className="single-signup-input">
            <label>Username</label>
            <input type="text" name="username" placeholder="Type Username here"
             // Updates the userDetails state object with what is  being typed into the username input field 
            onChange={handleSubmit} 
            value= {userDetails.username}
            />
          </div>

          <div className="single-signup-input">
              <label
            >Password</label>
              <div className="password">
              <input type='password' name="password" placeholder="Type Password here"
              // Updates the userDetails state object with what is  being typed into the password input field
              onChange={handleSubmit} 
              value= {userDetails.password}
              />
            </div>
          </div>
        </div>

        <div>
          <button 
          className="start-form-button"
          type="submit">Sign In</button>
        </div>

        <div className="create-account">
          <p>Already Have an Account</p>
          {/* Navigates back to the Login page and resets the error message status so the error message doesn't persist */}
          <button
          className="go-to-signup"
          onClick={() => { 
            setNeedSignUp(false)
            setErrorMessageStatus(false)}}
          >Login</button>
        </div>

      </form>
    </div>
  </div>
  );
}