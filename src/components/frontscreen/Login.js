import { Friends1, Friends2, Friends3, Friends4, Reveal, Hide } from '../../pictures/index.js';
import { useState, useEffect } from 'react'

export default function Login( { handleSubmit, userDetails, returningUser, setErrorMessageStatus, setNeedSignUp, hidePassword, setHidePassword } ) {

  // Used to store a value between 1 and 4 each number correlates to a picture in the slideshow. 
  const [ slideState, setSlideState ] = useState(1)

  // Use effect for the slideshow. Set the slide count to 4 as there are 4 pictures then every 5 seconds the slideState is increased by one unless the slideState gets to 4 the next increment will reset back to 1. I use the clear interval to stop multiple intervals starting and overlapping.
  useEffect(() => {
    let slideCount = 4;
    const slideInterval = setInterval(() => {
      if(slideState < slideCount) {
        setSlideState(slideState + 1)
      } else {
        setSlideState(1)
      }
    }, 5000)
    return () => clearInterval(slideInterval)
  }, [slideState])

  return (
    <>
    <div className="start-container">
      <div className="start-img-container">
        {/* Container for the images only one image will be shown at a time based on the current slidestate number */}
        <div className='all-images'>
          <img className={`img slide-show-${slideState}`} 
          src={Friends1}/>
          <img 
          className={`img slide-show-${slideState}`}
          src={Friends3}/>
          <img 
          className={`img slide-show-${slideState}`}
          src={Friends4}/>
          <img className={`img slide-show-${slideState}`}
          src={Friends2}/>
        </div>
      </div>

      <div className="start-form-container">
        <form 
        onSubmit={returningUser}
        className="start-form">
          {/* Deals with the email information as the user types into the input box the userDetails email section is updated */}
          <label>Email</label>
          <input 
          placeholder="type email..."
          value={userDetails.email}
          onChange={handleSubmit}
          name='email'
          />

          {/* Deals with the password information as the user types into the input box the userDetails password section is updated */}
          <label>Password</label>
          <div className='password'>
            <input 
            // Depending on the hide password state the password type is either set to password and is hidden from view or it is set to text so the user can see the value.
            type={hidePassword ? 'password': 'text'}
            placeholder="type password..."
            value={userDetails. password}
            onChange= {handleSubmit}
            name='password'
            />
            {/* The button toggles the hide password boolean between true and false. Also the image on the button changes icon depending on the hide password state. */}
            <button
              className='reveal-button'
              type='button'
              onClick={(e) => {
                e.preventDefault()
                setHidePassword(!hidePassword)}}
              >
              <img src={hidePassword ? Reveal: Hide} width='20px' />
            </button>
          </div>
          {/* Logs in the user if the details are correct */}
          <button
          className="start-form-button"
          type='submit'
          >Login</button>

          <div className="create-account">
            <p>Don't Have an account</p>
            {/* Navigates to the sign in page and resets the error message status so it won't persist when the page changes. */}
            <button
            className="go-to-signup"
            onClick={() =>{ 
              setNeedSignUp(true)
              setErrorMessageStatus(false)}}
            >Sign Up</button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}