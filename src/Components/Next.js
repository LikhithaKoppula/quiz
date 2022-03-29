import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
function Next(props) {
    //console.log(props.dataToNext)
    const [questions, setquestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers,setanswers]=useState(new Map());
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [level, setlevel] = useState(1);
    const getquestions = () => {
        useEffect(() => {
            if(localStorage.answers)
              setanswers(new Map(JSON.parse(localStorage.answers)))

            if(localStorage.currentQuestion){
                console.log(localStorage.currentQuestion)
                setCurrentQuestion(+localStorage.currentQuestion)
            }

            let lg=props.dataToNext ||localStorage.getItem("language");
            axios.get("http://localhost:5001/questions/" + lg + "/" + level).then((res) => {
                setquestions(...questions, res.data.questions);
                // console.log(res.data.questions);
            }
            )
        }, [])
        
    }
    getquestions();
    //console.log(questions);
    const NextQuestion = () => {
        if (currentQuestion + 1 < questions.length)
        {
            setCurrentQuestion(currentQuestion + 1);
            localStorage.setItem("currentQuestion",currentQuestion+1)
        }
        else {
            setShowScore(true);
        }

    }
    const PrevQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
        localStorage.setItem("currentQuestion",currentQuestion-1)
    }
    const setCurrentOption = index => e => {
      console.log(answers);
      setanswers(new Map(answers.set(currentQuestion,index)));
      let a1=answers
      a1.set(currentQuestion,index)
      localStorage.setItem("answers",JSON.stringify(Array.from(a1.entries())))
    }
    const validate=()=>
    {    console.log(answers);
        let cnt=0;

        for (const [key, value] of answers.entries()) {
            if(questions[key].answers[0]["text"]===questions[key].options[value]["text"])cnt++;
        }
        setScore(cnt)
        // console.log(cnt)
        const percentage = (cnt / questions.length) * 100
            console.log(cnt, percentage);
            if (percentage >= 60) {
                setlevel(2)   
            }
            setShowScore(true);
    }
    const refresh=()=>window.location.reload();
    return (<>
        <div className='container' >
            {showScore ? (<div className='score-section'>
                You scored {score} out of {questions.length}
                {level == 2 ?
                    (<>
                        <div className='mt-5 text-center'>Hurray ! You are Qualified for Level 2 </div>
                        <Link to="/display/level2"><button>Level 2</button></Link>
                    </>
                    ) :
                    (<>
                        <div className='mt-2' style={{display:"block"}}>
                            Sorry ! You are Not Qualified for Level 2 Please Try Again !!
                        <button on onClick={refresh}>Level-1</button>
                        </div>
                    </>)}
            </div>) : (
                <>  <div style={{marginLeft:"30%",marginTop:"20%"}}>
                    <h2 >Welcome to {props.dataToNext} quiz Level {level}</h2>
                    {questions.map(function (d, idx) {
                        if (idx == currentQuestion) return (
                            <>
                                <div className='question-section'>
                                    <div className='question-count'>
                                        <span>Question { currentQuestion + 1}</span>/{questions.length}
                                    </div>
                                    <div className='question-text'><h4>{d.question}</h4></div>
                                </div>
                                <div className='answer-section'>
                                {d["options"].map((o, index) => (
                                    <> <div className="form-check">
                                        <input className="form-check-input" onChange={setCurrentOption(index)} type="radio" name="radio" value={o.text}  checked = {index==answers.get(currentQuestion)} ></input>
                                        <label className="form-check-label" for={index} >{o.text}</label>
                                    </div>
                                    </>
                                ))}
                                </div>
                                <div className='d-flex'>
                                {
                                    currentQuestion!=0 ?(
                                    <button style={{marginLeft:"45%"}} type="button" className='btn btn-info mt-3' onClick={PrevQuestion}>Previous</button>):
                                    (<div></div>)
                                }
                                {
                                    currentQuestion!=(questions.length-1)?(
                                    <button style={{marginLeft:"45%"}} type="button" className='btn btn-info mt-3' onClick={NextQuestion}>Next</button>):
                                    (<button style={{marginLeft:"45%"}} type="button" className='btn btn-info mt-3' onClick={validate}>Submit</button>)
                                }
                                </div>
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