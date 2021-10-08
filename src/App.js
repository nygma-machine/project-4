import './styles/scss/styles.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HomePage from './HomePage'

function App() {
	return (
		<Router>
			<div className="App">
				<h1>Nygma</h1>
				<Route exact path='/' >
					<HomePage />
				</Route>
			</div>
		</Router>
	);
}

export default App;