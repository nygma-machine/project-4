import './styles/scss/styles.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Maze from './Maze'
import Results from './Results'
import Advice from './Advice';
import { useEffect, useState } from 'react';
import realtime from './firebase'
import { ref, onValue } from "firebase/database";
import setInput from './utils/HandleInput.js'

function App() {
	// Top level states
	const [userName, setUserName] = useState('');
	const [userKeyWord, setUserKeyWord] = useState('etc');
	const [mazeDifficulty, setMazeDifficulty] = useState('easy');
	const [userQuestion, setUserQuestion] = useState('');
	const [listOfNames, setListOfNames] = useState([])
	const [score, setScore] = useState(0)
	// const [newGame, setNewGame] = useState(false)

	const handleDifficultyChange = (event) => {
		setMazeDifficulty(event.target.value)
	}

	useEffect(() => {
		if (mazeDifficulty === 'easy') {
			setScore(100)
		} else if (mazeDifficulty === 'medium') {
			setScore(200)
		} else {
			setScore(300)
		}
	}, [mazeDifficulty])

	useEffect(() => {
		const databaseRef = ref(realtime, '/users')
		onValue(databaseRef, (snapshot) => {
			const myData = snapshot.val()
			let tempArray = []
			for (let propertyName in myData) {
				const currentName = {
					key: propertyName,
					usersName: myData[propertyName].usersName,
					score: myData[propertyName].score
				}
				// console.log(currentName);
				tempArray.push(currentName)
			}
			tempArray.sort((element1, element2) => {
				if (element1.score < element2.score) {
					return 1
				}
				if (element1.score > element2.score) {
					return -1
				}
				return 0
			})
			let tempTempArray = tempArray.slice(0, 20)
			setListOfNames(tempTempArray)
		})
	}, [])

	return (
		<Router>
			<div className="App">
				<Route exact path="/">
					<HomePage
						userName={userName}
						handleName={(event) => setInput(setUserName, event)}
						userKeyWord={userKeyWord}
						handleKeyWord={(event) => setInput(setUserKeyWord, event)}
						userQuestion={userQuestion}
						handleQuestion={(event) => setInput(setUserQuestion, event)}
						mazeDifficulty={mazeDifficulty}
						handleDifficulty={handleDifficultyChange}
					/>
				</Route>
				<Route exact path='/Maze' >
					<Maze
						mazeDifficulty={mazeDifficulty}
						score={score}
						setScore={setScore}
						query={userKeyWord} />
				</Route>

				{/* Conditional that takes 'etc' value and returns a different component link. Essentially, if user does not select etc use the value for a keyword in search Query. If etc get random advice. */}

				{userKeyWord !== "etc" ?
					(
						<Route exact path='/Results/:query'>
							<Results
								question={userQuestion}
								name={userName}
								difficulty={mazeDifficulty}
								hallOfFame={listOfNames}
								score={score}
							/>
						</Route>
					)
					: (
						<Route exact path='/Advice'>
							<Advice
								question={userQuestion}
								name={userName}
								difficulty={mazeDifficulty}
								hallOfFame={listOfNames}
								score={score}
							/>
						</Route>
					)}
			</div>
			<footer>
				<div className="wrapper">
					<a href="https://junocollege.com">Created at Juno College by Brian Canuto, Hal Forrest, Solon Gee, and Corey Hamat</a>
					<p>Commissioned by Edward Nygma</p>
					<p>Built with the <span><a href="https://api.adviceslip.com/">advice slip API</a></span></p>
				</div>
			</footer>
		</Router >
	)
}

export default App
