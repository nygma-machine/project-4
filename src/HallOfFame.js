import realtime from './firebase'
import { ref, push } from 'firebase/database'
import { useEffect } from 'react'

const HallOfFame = (props) => {

	const {hallOfFame, name} = props

	useEffect(() => {
		if (name) {
			const databaseRef = ref(realtime, '/users')
			push(databaseRef, {usersName: name})
		}
	}, [name])

	return (
		<div className="leaderboard">
			<h2>Hall of Fame: </h2>
			<ul>
				{hallOfFame.map((element) => {
					return (
						<li key={element.key}>{element.usersName}</li>
					)
				})}
			</ul>
		</div>
	)
}

export default HallOfFame