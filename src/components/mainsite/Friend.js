import { Link } from "react-router-dom";

export default function Friend({ friendInfo }) {
  return(
    <div className="friend">
      <Link to={`/${friendInfo.id}`}
      ><p>Username: {friendInfo.username}</p></Link>
      <p>Name: {friendInfo.name ? friendInfo.name: 'N/A'}</p>
      <p>Hometown: {friendInfo.hometown ? friendInfo.hometown: 'N/A'}</p>
    </div>
  )


}