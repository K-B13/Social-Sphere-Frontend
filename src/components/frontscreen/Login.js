export default function Login( { handleSubmit, userDetails, returningUser } ) {
  return (
    <form
    className="login-form"
    onSubmit={
      returningUser}
    >
      <div className="both-login-inputs">
      <div className="single-login-input">
        <label>Email</label>
        <input type="text" name="email" placeholder="Type Email here" 
        onChange={handleSubmit} value={userDetails.email}
        />
      </div>
      
      <div className="single-login-input">
        <label>Password</label>
        <input type="password" name="password" placeholder="Type Password here" 
        onChange={handleSubmit} value={userDetails.password}
        />
        </div>
      </div>
      <div>
        <button className="login-button"
        type="submit">Login</button>
      </div>
    </form>
  )
}