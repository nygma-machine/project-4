import './styles/scss/styles.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HomePage from './HomePage'
import Maze from './Maze'
import Results from './Results'
import Advice from './Advice';
import { useEffect, useState } from 'react';
import questionMark from './questionMark.png'
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

	const handleDifficultyChange = (event) => {
		setMazeDifficulty(event.target.value)
		// Set start score based on difficulty
		if (event.target.value === 'easy') {
			setScore(100)
		} else if (event.target.value === 'medium') {
			setScore(200)
		} else {
			setScore(300)
		}
	}
  
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
			setListOfNames(tempArray)
		})
	}, [])

	return (
		<Router>
			<div className="App">
				<div className="headerFlex wrapper">
					<div className="siteHeading">
						<Link to='/'>
							<h1>The <span>Nygma</span> Machine</h1>
						</Link>
						<p>What astounds man, but challenges mice? Has an ear that cannot hear, and a heart that only the clever beat?
						</p>
					</div>
					<div className="imgContainer">
						<img src={questionMark} alt="a question mark" />
					</div>
				</div>
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
						<Route exact path={`/Results/:query`}>
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
						<Route exact path={`/Advice`}>
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
				<a href="https://junocollege.com">Created at Juno College by Brian Canuto, Hal Forrest, Solon Gee, and Corey Hamat</a>
				<p>Commissioned by Edward Nygma</p>
				<p>Built with the <span><a href="https://api.adviceslip.com/">advice slip API</a></span></p>
			</footer>
		</Router >
	)
}

export default App
