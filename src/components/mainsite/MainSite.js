import { useEffect } from "react";
import { currentUser } from "../../api/UserApis"
export default function MainSite() {
  const loggedInUser = () => {
    
    currentUser().then((res) => res.json())
    .then((data) => {
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