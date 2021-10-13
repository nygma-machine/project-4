import realtime from './firebase'
import { ref, push } from 'firebase/database'
import { useEffect } from 'react'

const HallOfFame = (props) => {

	const {hallOfFame, name, score} = props

	useEffect(() => {
		if (name) {
			const databaseRef = ref(realtime, '/users')
			push(databaseRef, {usersName: name, score: score})
		}
	}, [name, score])

	return (
		<div className="leaderboard">
			<h2>Hall of Fame: </h2>
			<ul>
				{hallOfFame.map((element) => {
					return (
						<li key={element.key}><span className="hofName">{element.usersName}</span>: {element.score}</li>
					)
				})}
			</ul>
		</div>
	)
}

export default HallOfFame