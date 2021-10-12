import './styles/scss/styles.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
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

	useEffect(() => {
		const databaseRef = ref(realtime, '/users')
		onValue(databaseRef, (snapshot) => {
			const myData = snapshot.val()
			let tempArray = []
			for (let propertyName in myData) {
				const currentName = {
					key: propertyName,
					usersName: myData[propertyName].usersName
				}
				tempArray.push(currentName)
			}
			setListOfNames(tempArray)
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
						handleDifficulty={(event) => setInput(setMazeDifficulty, event)}
					/>
				</Route>
				<Route exact path='/Maze' >
					<Maze
						mazeDifficulty={mazeDifficulty}
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
