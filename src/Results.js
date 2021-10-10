import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import axios from "axios";

const Results = (props) => {

	const { query } = useParams()

	const [advice, setAdvice] = useState([])

	const { question, name, difficulty } = props

	useEffect(() => {
		axios({
			url: `https://api.adviceslip.com/advice/search/${query}`,
			method: 'GET',
			dataResponse: 'json'
		}).then((res) => {
			const getAdvice = res.data.slips;
			const selectAdvice = random(getAdvice)
			setAdvice(selectAdvice)
		})
	}, [query])

	const random = (array) => {
		const index = Math.floor(Math.random() * array.length)
		return array[index]
	}

	return (
		<>
			<div className="wrapper">
				<div className="results">
					{name !== "" ? (
						<h2>Congratulations {name}! You Have Conquered the Maze</h2>
					  <h2>That was a {difficulty} difficulty maze.</h2>
					) : (
						<h2>Congradulations! You have Conquered the Maze</h2>
            <h2>That was a {difficulty} difficulty maze.</h2>
					)}
					{question !== "" ? (
						<p className="repeatQuestion">You asked <span>{`"${question}"`}</span></p>
					) : (
						<p className="repeatQuestion">You chose to not ask a Quesion...</p>
					)}
					<h3 className="adviceHead">The NYGMA Machine Advises You:</h3>
					<p className="advice">{advice.advice}</p>
					<Link to='/'>
						<button className="repeatGame">Play Again?</button>
					</Link>
				</div>
			</div>
		</>
	)
}
export default Results;


// Get keyword from App.js
// use Keyword as query param in API Call
// Math.floor(Math.random()) function to randomly select 'advice' object
// 'Advice' state to display results on page
// Button with option to play again?