// Page that renders if the user does not select one of the suggested keywords

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

const Advice = (props) => {


  const [advice, setAdvice] = useState([])
  
  const {question, name} = props

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
            <h2>Congratulations {name}! You Have Completed the Maze</h2>
            <p>You asked "{question}"</p>
            <p>The NYGMA Machine Advises You:</p>
            <p>{advice}</p>
            <Link to='/'>
              <button>Play Again?</button>
            </Link>
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