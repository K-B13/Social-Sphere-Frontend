import Login from "./Login"
import SignUp from "./SignUp"
import { useState } from "react"
import { createUser, loginUser } from "../../api/UserApis";
import { useNavigate } from "react-router";

export default function StartPage() {
  const [ startMessage, setStartMessage ] = useState(0)
  const [ userDetails, setUserDetails ] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()
  

  const handleSubmit =  (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value})
  }

  const newUser = (e) => {
    e.preventDefault()
    createUser(userDetails)
    .then((res) => {
      if (res.ok) setStartMessage(1)
      else console.log("Didn't work")
    })
    .then(() => setUserDetails({email:"",password:""}))
  }

  const returningUser = (e) => {
    e.preventDefault()
    loginUser(userDetails)
    .then((response) => {
      if (response.ok) {
      localStorage.setItem('Auth Token', JSON.stringify(response.headers.get('Authorization')))
      navigate('/MainSite')
    }
      else console.log('you shall not pass')
    })
  }

  return(
    <div>
      <h1>Social Sphere</h1>
      <img src='https://img.icons8.com/?size=2x&id=rJe96vXFGcP6&format=png' />
      <div>
        <button onClick={() => setStartMessage(1)}>Login</button>
        <button onClick={() => setStartMessage(2)}>SignUp</button>
      </div>
      <div>
        {startMessage === 0? <p>
Welcome to The Social Sphere, the online platform dedicated to uniting people from all walks of life! We are thrilled to have you join our vibrant community, where connections are made, ideas are shared, and friendships are formed.
<br /><br />
At The Social Sphere, we believe that true unity comes from embracing diversity. Our platform is designed to bring individuals together, regardless of their backgrounds, cultures, or beliefs. It's a place where you can discover new perspectives, engage in meaningful conversations, and foster a sense of belonging.
<br /><br />
Whether you're here to share your passions, seek inspiration, or simply connect with like-minded individuals, The Social Sphere offers a welcoming space for everyone. Embrace the opportunity to connect with people from around the globe, exchanging ideas, stories, and experiences that enrich your journey.
<br /><br />
Our mission is to create a positive and inclusive environment where respect, empathy, and understanding thrive. We encourage you to be yourself, express your thoughts, and embrace the diversity of opinions within our community. Together, let's foster meaningful connections, build bridges, and make a lasting impact on each other's lives.
<br /><br />
Get ready to explore The Social Sphere, where the possibilities are endless. Engage in discussions, share your accomplishments, and create lasting memories with friends, both old and new. Let the power of unity shape your experience, as we journey together towards a more connected and compassionate world.
<br /><br />
Welcome to The Social Sphere – where unity begins and friendships flourish. Start your adventure today and become a part of our extraordinary community!
<br /><br />
Best regards,
The Social Sphere Team
</p>: null}
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