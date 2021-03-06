import './styles/scss/styles.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Maze from './components/Maze'
import Results from './components/Results'
import Advice from './components/Advice';
import { useEffect, useState } from 'react';
import realtime from './utils/firebase'
import { ref, onValue } from "firebase/database";
import setInput from './utils/HandleInput.js'

function App() {
	// Top level states
	const [userName, setUserName] = useState('');
	const [userKeyWord, setUserKeyWord] = useState('etc');
	const [mazeDifficulty, setMazeDifficulty] = useState('easy');
	const [userQuestion, setUserQuestion] = useState('');
	const [listOfNames, setListOfNames] = useState([])
	const [listOfShames, setListOfShames] = useState([])
	const [score, setScore] = useState(0)
	const [newGame, setNewGame] = useState(false)

	const handleDifficultyChange = (event) => {
		setMazeDifficulty(event.target.value)
	}

	// resets the form when submitted
	const resetForm = () => {
		setMazeDifficulty('easy')
		setUserName('')
		setUserKeyWord('etc')
		setUserQuestion('')
	}

	// sets the initial score of the user based on the difficulty
	useEffect(() => {
		if (mazeDifficulty === 'easy') {
			setScore(100)
		} else if (mazeDifficulty === 'medium') {
			setScore(200)
		} else {
			setScore(300)
		}
	}, [mazeDifficulty, newGame])

	// creates listener for the firebase array, to grab the list of high scores, only keeping the top 20
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
			tempArray.sort((element1, element2) => {
				if (element1.score < element2.score) {
					return -1
				}
				if (element1.score > element2.score) {
					return 1
				}
				return 0
			})
			let tempTempTempArray = tempArray.slice(0, 20)
			setListOfShames(tempTempTempArray)
		})
	}, [])

	// main jsx return
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
								hallOfShame={listOfShames}
								score={score}
								newGame={newGame}
								setNewGame={setNewGame}
								resetForm={resetForm}
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
								hallOfShame={listOfShames}
								score={score}
								setNewGame={setNewGame}
								newGame={newGame}
								resetForm={resetForm}
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
