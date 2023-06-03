import { Link } from "react-router-dom";

export default function Friend({ friendInfo }) {
  return(
    <div>
      <Link to={`/${friendInfo.id}`}
      ><p>Username: {friendInfo.username}</p></Link>
      <p>Name: {friendInfo.name}</p>
      <p>Hometown: {friendInfo.hometown}</p>
      <hr />
    </div>
  )


}