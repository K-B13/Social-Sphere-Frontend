import Friend from "./Friend"

export default function Friends({ allPossibleAnswers }) {
  return(
    <div>
    {allPossibleAnswers.length ? 
    allPossibleAnswers.map(friendInfo => {
      return <Friend friendInfo={friendInfo} key={friendInfo.id} />
    })
    : null}
    </div>
  )

}