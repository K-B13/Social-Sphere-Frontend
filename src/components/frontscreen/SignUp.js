export default function SignUp( {newUser, handleSubmit, userDetails }) {
  return (
    <form  className="signup-form"
    onSubmit={newUser}
    >
    <div className="both-signup-inputs">
      <div className="single-signup-input">
        <label>Email</label>
        <input type="text" name="email" placeholder="Type Email here" 
        onChange={handleSubmit} 
        value= {userDetails.email}
        />
      </div>
      <div className="single-signup-input">
        <label>Username</label>
        <input type="text" name="username" placeholder="Type Username here" 
        onChange={handleSubmit} 
        value= {userDetails.username}
        />
      </div>
      <div className="single-signup-input">
        <label>Password</label>
        <input type="password" name="password" placeholder="Type Password here"
        onChange={handleSubmit} 
        value= {userDetails.password}
        />
      </div>
    </div>
    <button 
    className="login-button"
    type="submit">Sign In</button>
  </form>
  );
}