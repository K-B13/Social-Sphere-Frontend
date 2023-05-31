
import { useState } from "react";

export default function SignUp( {newUser, handleSubmit, userDetails }) {
  return (
    <form
    onSubmit={newUser}
    >
    <br />
    <label>Email</label>
    <input type="text" name="email" placeholder="Email" 
    onChange={handleSubmit} 
    value= {userDetails.email}
    />
    <br/><br />
    <label>Password</label>
    <input type="password" name="password" placeholder="Password"
    onChange={handleSubmit} 
    value= {userDetails.password}
    />
    <br /><br />
    <button type="submit">Sign In</button>
  </form>
  );
}