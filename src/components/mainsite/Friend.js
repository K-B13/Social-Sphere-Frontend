import { Link } from "react-router-dom";
import { NoPic } from '../../pictures/index'
export default function Friend({ friendInfo }) {
  return(
    <div className="friend">
      <div>
        {/* If the user has an image than that image is used if not then a default image is used in its place */}
        <img 
        className="profile-image"
        src={friendInfo.pic ? friendInfo.pic: NoPic} />
      </div>
      
      {/* Displays the user data with the username being a link to that users profile. */}
      <div>
        <Link to={`/${friendInfo.id}`}
        ><p>Username: {friendInfo.username}</p></Link>

        {/* If the user has not added a name or hometown N/A is used in its place */}
        <p>Name: {friendInfo.name ? friendInfo.name: 'N/A'}</p>
        <p>Hometown: {friendInfo. hometown ? friendInfo. hometown: 'N/A'}</p>
      </div>
    </div>
  )
}