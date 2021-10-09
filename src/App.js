import './styles/scss/styles.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HomePage from './HomePage'
import Maze from './Maze'
import Results from './Results'
import Advice from './Advice';
import { useState } from 'react';

function App() {

	const [userName, setUserName] = useState('');
	const [userKeyWord, setUserKeyWord] = useState('time');
	const [userQuestion, setUserQuestion] = useState('');

	// const [advice, setAdvice] = useState('')
	// const [userName, setUserName] = useState('')
	// const [query, setQuery] = useState('')
	// const [queryTopic, setQueryTopic] = useState('')

	// const [userObj, setUseObj] = useState({name: })

	// const submitHandler = () => {
	// 	axios({
	// 		url:`https://api.adviceslip.com/advice/search/${query}`,
	// 	}).then((res) =>{
	// 		console.log(res.data.slip.advice)
	// 		setAdvice(res.data.slip.advice)
	// 	})	
	// }

	const showValues = (event) => {
		event.preventDefault();
		console.log(userName);
		console.log(userKeyWord);
		console.log(userQuestion)
}


	return (
		<Router>
			<div className="App">
				<h1>Nygma</h1>
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
					userQuestion={userQuestion} />
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
					name={userName} />
				</Route>
				) 
			: (
				<Route exact path={`/Advice`}>
					<Advice
					question={userQuestion}
					name={userName}
					/>
				</Route>
				)}
			</div>
		</Router >
	)
}

export default App
