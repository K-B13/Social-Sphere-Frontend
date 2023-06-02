export default function UserInformation({ userDetails }) {
  return(
    <div>
      <h3>{userDetails.username}'s Information</h3>
      <p>Name: {userDetails.name ? userDetails.name: 'N/A'}</p>
      <p>Hometown: {userDetails.hometown ? userDetails.hometown: 'N/A'}</p>
      <p>Bio: {userDetails.bio ? userDetails.bio: 'N/A'}</p>
      <p>Date of Birth: {userDetails.dob ? userDetails.dob: 'N/A'}</p>
      <hr />
    </div>
  )
}