import './styles/scss/styles.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HomePage from './HomePage'
import Maze from './Maze'
import Results from './Results'

function App() {
	return (
		<Router>
			<div className="App">
				<h1>Nygma</h1>
				<nav>
				<ul>
					<li></li>
					<li></li>
					<li></li>
				</ul>
				
					</nav>
				<Route exact path='/' >
					<HomePage />
				</Route>
				<Route exact path='/Maze' >
					<Maze />
				</Route>
				<Route exact path='/Results' >
					<Results />
				</Route>
			</div>
		</Router>
	);
}

export default App;
