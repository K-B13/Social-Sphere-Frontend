import { useEffect, useState } from "react";
import { currentUser } from "../../api/UserApis"
export default function MainSite() {
  const [userData, setUserData] = useState("")
  const loggedInUser = () => {
    
    currentUser().then((res) => res.json())
    .then((data) => {
      console.log(data)
      localStorage.setItem('User Info', JSON.stringify(data))})
    // .catch((error) => console.log(error))
  }

  useEffect(() => {
    loggedInUser()
  }, [])
  
  return(
    <div>
      <h1>Social Sphere</h1>
    </div>
  )
}