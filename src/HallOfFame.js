import realtime from './firebase'
import { ref, push } from 'firebase/database'
import { useEffect } from 'react'

const HallOfFame = (props) => {

	// destructure props for variables
	const {hallOfFame, name, score} = props

	// hall of fame only loads when the user reaches the results/advice page, so they've completed the maze, so add their name and score to the database
	useEffect(() => {
		if (name) {
			const databaseRef = ref(realtime, '/users')
			push(databaseRef, {usersName: name, score: score})
		}
	}, [name, score])

	// return jsx for the leaderboard displaying the names of users with the highest scores
	return (
		<div className="leaderboard">
			<h2>Hall of Fame: </h2>
			<ul>
				{hallOfFame.map((element) => {
					return (
						<li key={element.key}><span className="hofName">{element.usersName}</span>: <span className="userScore">{element.score}</span></li>
					)
				})}
			</ul>
		</div>
	)
}

export default HallOfFame