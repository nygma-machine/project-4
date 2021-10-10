import './styles/scss/styles.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HomePage from './HomePage'
import Maze from './Maze'
import Results from './Results'
import Advice from './Advice';
import { useState } from 'react';
import questionMark from './questionMark.png'

function App() {

	const [userName, setUserName] = useState('');
	const [userKeyWord, setUserKeyWord] = useState('etc');
	const [mazeDifficulty, setMazeDifficulty] = useState('easy');
	const [userQuestion, setUserQuestion] = useState('');


	const showValues = (event) => {
		event.preventDefault();
		console.log(userName);
		console.log(userKeyWord);
		console.log(userQuestion)
}


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
						<img src={questionMark} alt="" />
					</div>
				</div>
				<nav>
					<ul>
						<li>
							<Link to="/">
								<p>HomePage</p>
							</Link>
						</li>
						<li>
							<Link to="/Maze">
								<p>Maze</p>
							</Link>
						</li>
						<li>
							{userKeyWord !== "etc" ? (
							<Link to={`/Results/${userKeyWord}`}>
								<p>Results</p>
							</Link>
							) : (
							<Link to='/Advice'>
								<p>Results</p>
							</Link>
							)
							}
						</li>
					</ul>
				</nav>
				<Route exact path="/">
					<HomePage
					setUserName={setUserName}
					setUserKeyword={setUserKeyWord}
					setUserQuestion={setUserQuestion}
					submitPrompts={showValues}
					userName={userName}
					userKeyWord={userKeyWord}
					userQuestion={userQuestion}
					mazeDifficulty={mazeDifficulty}
					setMazeDifficulty={setMazeDifficulty}
					/>
				</Route>
				<Route exact path='/Maze' >
					<Maze 
					query={userKeyWord}/>
				</Route>
				{userKeyWord !== "etc" ? 
				(
				<Route exact path={`/Results/:query`}>
					<Results
					question={userQuestion}
					name={userName}
					difficulty={mazeDifficulty} />
				</Route>
				) 
			: (
				<Route exact path={`/Advice`}>
					<Advice
					question={userQuestion}
					name={userName}
					difficulty={mazeDifficulty}
					/>
				</Route>
				)}
			</div>
			<footer>
				<a href="https://junocollege.com">Created at Juno College by Brian Canuto, Hal Forrest, Solon Gee, and Corey Hamat</a>
				<p>Commissioned by Edward Nigma</p>
				<p>Built with the <span><a href="https://api.adviceslip.com/">advice slip API</a></span></p>
			</footer>
		</Router >
	)
}

export default App
