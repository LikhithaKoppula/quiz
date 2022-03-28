import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
function Next(props) {
    //console.log(props.dataToNext)
    const [questions, setquestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [option, setoption] = useState("");
    const [level, setlevel] = useState(1);
    const getquestions = () => {
        useEffect(() => {
            axios.get("http://localhost:5001/questions/" + props.dataToNext + "/" + level).then((res) => {

                setquestions(...questions, res.data.questions);
                // console.log(res.data.questions);
            }
            )
        }, [])

    }
    getquestions();
    console.log(questions);
    const check = () => {
        const answer = option
        if (answer == questions[currentQuestion]["answers"][0]["text"]) {
            setScore(score + 1)
        }
        // console.log(currentQuestion)
        if (currentQuestion + 1 < questions.length)
            setCurrentQuestion(currentQuestion + 1);
        else {
            setShowScore(true);
            const percentage = (score / questions.length) * 100
            console.log(score, percentage);
            if (percentage >= 60) {
                setlevel(2)
            }

        }

    }
    const setCurrentOption = (e) => {
        setoption(e.target.value)
        //console.log(e.target.value);
    }
    return (<>
        <div className='container'>
            {showScore ? (<div style={{marginTop:"10%",marginLeft:"35%",fontSize:"30px" }} >
                You scored {score} out of {questions.length}
                {level == 2 ?
                    (<>
                    <div >
                        <br></br>
                         <span className='result' style={{fontSize:"30px"}}>You are Qualified to Level 2 </span><br></br>
                         <br></br>
                        <div className='Image'><img src='https://i.gifer.com/Ju9P.gif' style={{height:"40%" , width:"40%"}}></img></div>
                       
                        <Link to="/display/level2"><button className='button1' style={{ fontSize: "16px",padding: "15px 32px", margin:"4px 2px", cursor: "pointer",marginTop:"4%",marginLeft:"10%",onClick:"animated"}}>Level 2</button></Link><br></br>
                    </div>
                    </>
                    ) :
                    (<>
                        <div className='mt-2' style={{display:"block",fontSize:"30px"}}>
                             You are Not Qualified for Level 2 Please Try Again !!
                             <br></br><br></br>
                             <div className='Image'><img src='https://www.sorryimages.love/images/quotes/english/general/cute-sorry-animated-image-gif-52650-304402.gif' style={{height:"40%" , width:"40%"}}></img></div>
                        <Link to="/display/level1" ><button className='button2' style={{ fontSize: "16px",padding: "15px 32px", margin:"4px 2px", cursor: "pointer",marginTop:"4%",marginLeft:"10%"}}>Level-1</button></Link>
                        </div>
                    </>)}
            </div>) : (
                <>  <div className='questions' style={{marginLeft:"30%",marginTop:"20%"}}>
                    <h2 >Welcome to {props.dataToNext} quiz Level {level}</h2>
                    {questions.map(function (d, idx) {
                        if (idx == currentQuestion) return (
                            <>
                                <div className='question-section'>
                                    <div className='question-count'>
                                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                                    </div>
                                    <div className='question-text'><h4>{d.question}</h4></div>
                                </div>
                                <div className='answer-section'>
                                {d["options"].map((o, index) => (
                                    <> <div className="form-check">
                                        <input className="form-check-input" onChange={setCurrentOption} type="radio" name="radio" value={o.text}></input>
                                        <label className="form-check-label" for={index} >{o.text}</label>
                                    </div>
                                    </>
                                ))}
                                </div>
                                <button style={{marginLeft:"45%"}} type="button" className='btn btn-info mt-3' onClick={check}>Next</button>
                            </>
                        )
                    })
                    }
                    
                </div>
                </>
            )
            }
        </div>
    </>
    )
}

export default Next