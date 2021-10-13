import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom'
import axios from "axios";
import HallOfFame from "./HallOfFame";

const Results = (props) => {

	const { query } = useParams()

	const [advice, setAdvice] = useState([])

	const { question, name, difficulty, hallOfFame, score, newGame, setNewGame } = props

	let history = useHistory()

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

	const playAgain = () => {
		history.push('/')
		setNewGame(!newGame)
	}

	return (
		<>
			<div className="wrapper">
				<div className="resultsFlex">
					<div className="results">
						{name !== "" ? (
							<div className="congrats">
								<h2>Congratulations {name}! You Have Conquered the Maze</h2>
								{difficulty === "easy" ? (
									<h2>That was an {difficulty} maze.  You received a score of {score} based on your efficiency.</h2>
								) : (
									<h2>That was a {difficulty} maze.  You received a score of {score} based on your efficiency.</h2>
								)}
							</div>
						) : (
							<div className="congrats">
								<h2>Congratulations! You have Conquered the Maze</h2>
								{difficulty === "easy" ? (
									<h2>That was an {difficulty} maze.  You received a score of {score} based on your efficiency.</h2>
								) : (
									<h2>That was a {difficulty} maze.  You received a score of {score} based on your efficiency.</h2>
								)}
							</div>
						)}
						{question !== "" ? (
							<p className="repeatQuestion">You asked <span>{`"${question}"`}</span></p>
						) : (
							<p className="repeatQuestion">You chose to not ask a Quesion...</p>
						)}
						<h3 className="adviceHead">The NYGMA Machine Advises You:</h3>
						<p className="advice">{advice.advice}</p>
						<button className="repeatGame" onClick={playAgain}>Play Again?</button>
					</div>
					<HallOfFame 
						hallOfFame={hallOfFame} 
						name={name} 
						score={score} 
					/>
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