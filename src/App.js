import './styles/scss/styles.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HomePage from './HomePage'
import Maze from './Maze'
import Results from './Results'
import axios from 'axios';
import { useState } from 'react';

function App() {

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
							<Link to="/Results">
								<p>Results</p>
							</Link>
						</li>
					</ul>
				</nav>
				<Route exact path='/'>
					<HomePage />
					{/* // setTopics={setQueryTopic} 
					// setAdvice={setAdvice} 
					// setUserName={setUserName} 
					/> */}
				</Route>
				<Route exact path='/Maze' >
					<Maze />
				</Route>
				<Route exact path='/Results' >
					<Results />
				</Route>
			</div>
		</Router >
	)
}

export default App
