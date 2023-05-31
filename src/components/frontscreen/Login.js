export default function Login( { handleSubmit, userDetails, returningUser } ) {
  return (
    <form
    onSubmit={
      returningUser}
    >
      <br />
      <label>Email</label>
      <input type="text" name="email" placeholder="Email" 
      onChange={handleSubmit} value={userDetails.email}
      />
      <br /><br />
      <label>Password</label>
      <input type="password" name="password" placeholder="Password" 
      onChange={handleSubmit} value={userDetails.password}
      />
      <br /><br />
      <button type="submit">Login</button>
    </form>
  )
}