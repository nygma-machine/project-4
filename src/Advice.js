// Page that renders if the user does not select one of the suggested keywords

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

const Advice = (props) => {


  const [advice, setAdvice] = useState([])
  const { question, name, difficulty } = props


  useEffect(() => {
    axios({
      url: `https://api.adviceslip.com/advice`,
      method:'GET',
      dataResponse:'json'
    }).then((res) =>{
      const adviceResult = res.data.slip
      setAdvice(adviceResult.advice)
    })
  }, [])

  return (
		<>
			<div className="wrapper">
				<div className="results">
					{name !== "" ? (
						<div className="congrats">
							<h2>Congratulations {name}! You Have Conquered the Maze</h2>
							<h2>That was a {difficulty} maze.</h2>
						</div>
					) : (
						<div className="congrats">
							<h2>Congradulations! You have Conquered the Maze</h2>
							<h2>That was a {difficulty} maze.</h2>
						</div>
					)}
					{question !== "" ? (
						<p className="repeatQuestion">You asked <span>{`"${question}"`}</span></p>
					) : (
						<p className="repeatQuestion">You chose to not ask a Quesion...</p>
					)}
					<h3 className="adviceHead">The NYGMA Machine Advises You:</h3>
					<p className="advice">{advice}</p>
					<Link to='/'>
						<button className="repeatGame">Play Again?</button>
					</Link>
				</div>
			</div>
		</>
	)        
  }

export default Advice;


// Get keyword from App.js
// use Keyword as query param in API Call
// Math.floor(Math.random()) function to randomly select 'advice' object
// 'Advice' state to display results on page
// Button with option to play again?