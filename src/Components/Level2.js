import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import swal from "sweetalert2";
import axios from "axios";
function Level2(props) {
    //console.log(props.dataToNext)
    const [questions, setquestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setanswers] = useState(new Map());
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [level, setlevel] = useState(2);
    const [vis, setvis] = useState(new Array(10).fill(0));

    const changeQuestion = (e) => {
        setCurrentQuestion(+e.target.value - 1);
    };
    if(parseInt(localStorage.getItem("Level1_percentage"))<60)
        window.location.href='/'

    const getquestions = () => {
        useEffect(() => {
            if (localStorage.answers)
                setanswers(new Map(JSON.parse(localStorage.answers)));

            if (localStorage.currentQuestion) {
                console.log(localStorage.currentQuestion);
                setCurrentQuestion(+localStorage.currentQuestion);
            }

            if (localStorage.visited) {
                const ar = localStorage.visited.split(",");
                if (Math.max(ar) != 0) setvis(ar);
            }

            let lg = props.dataToNext || localStorage.getItem("language");
            axios
                .get("http://localhost:5001/questions/" + lg + "/" + level)
                .then((res) => {
                    setquestions(...questions, res.data.questions);
                    // console.log(res.data.questions);
                });
        }, []);
    };
    getquestions();
    //console.log(questions);
    const NextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            localStorage.setItem("currentQuestion", currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    };
    const PrevQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
        localStorage.setItem("currentQuestion", currentQuestion - 1);
    };
    const setCurrentOption = (index) => (e) => {
        console.log(answers);
        setanswers(new Map(answers.set(currentQuestion, index)));
        let a1 = answers;
        let k = vis;
        console.log(vis);
        k[currentQuestion] = 1;
        setvis(k);

        a1.set(currentQuestion, index);
        localStorage.setItem("visited", k);
        localStorage.setItem("answers", JSON.stringify(Array.from(a1.entries())));
    };
    const delstorage = () => {
        localStorage.removeItem("answers");
        localStorage.removeItem("currentQuestion");
        localStorage.removeItem("visited");
        
        //refresh();
    };
    const validate = () => {
        console.log(answers);
        let cnt = 0;
        localStorage.removeItem("answers");
        localStorage.removeItem("currentQuestion");
        for (const [key, value] of answers.entries()) {
            if (
                questions[key].answers[0]["text"] ===
                questions[key].options[value]["text"]
            )
                cnt++;
        }
        setScore(cnt);
        // console.log(cnt)
        const percentage = (cnt / questions.length) * 100;
        console.log(cnt, percentage);
        if (percentage >= 60) {
            setlevel(3);
        }
        setShowScore(true);
    };
    //const refresh = () => window.location.reload();
    return (
        <>
            <div className="container d-flex">
                {showScore ? (
                    <div
                        style={{ marginTop: "10%", marginLeft: "35%", fontSize: "30px" }}
                    >
                        You scored {score} out of {questions.length}
                        {level == 3 ? (
                            <>
                                {swal
                                    .fire({
                                        title: "Congratulations.",
                                        html: `<h3>Your Average Percentage of <b style="font-weight:bolder;color:black">${localStorage.language}</b> is <span style="color:#008000;">${(parseInt(localStorage.getItem("Level1_Percentage")) + (score/questions.length)*100) /
                                            2
                                            }%</span> 
                                            </b></h3>
                                            <h5>Level1: ${localStorage.getItem("Level1_Percentage")}%</h5>
                                            <h5>Level2: ${(score/questions.length)*100}%</h5>
                            `,
                                        icon: "success",
                                        confirmButtonColor: "#008000",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Ok!!",
                                    })
                                    .then((result) => {
                                        if (result.isConfirmed) {
                                            delstorage();
                                            localStorage.removeItem("Level1_Percentage")
                                            window.location.href = "/";
                                        } else {
                                            delstorage();
                                            localStorage.removeItem("Level1_Percentage")
                                            window.location.href = "/";
                                        }
                                    })}
                            </>
                        ) : (
                            <>
                                {swal
                                    .fire({
                                        title: "Sorry!!",
                                        html: `<h1>You scored <span style="color:#cc3300;">${score}</span> out of <b style="font-weight:bolder;color:black">${questions.length}</b></h1>`,
                                        icon: "error",
                                        confirmButtonColor: "#e63900",
                                        confirmButtonText: "Level2",
                                    })
                                    .then((result) => {
                                        if (result.isConfirmed) {
                                            delstorage();
                                            window.location.href = "/display/level2";
                                        } else {
                                            delstorage();
                                            window.location.href = "/display/level2";
                                        }
                                    })}
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        <div
                            style={{
                                border: "5px solid grey",
                                maxWidth: "20%",
                                padding: "1%",
                                marginLeft: "1%",
                                marginTop: "15%",
                                paddingLeft: "2.3%",
                                maxHeight: "365px",
                                outline: "1px solid black",
                            }}
                        >
                            <button
                                className="button mx-2 my-2"
                                value="1"
                                style={{
                                    backgroundColor: vis[0] == 0 ? "rgb(136,136,136)" : "#339966",
                                    fontWeight: "bold",
                                    borderRadius: "20%",
                                }}
                                onClick={changeQuestion}
                            >
                                1
                            </button>
                            <button
                                className="button mx-2 my-2"
                                value="2"
                                style={{
                                    backgroundColor: vis[1] == 0 ? "rgb(136,136,136)" : "#339966",
                                    fontWeight: "bold",
                                    borderRadius: "20%",
                                }}
                                onClick={changeQuestion}
                            >
                                2
                            </button>
                            <button
                                className="button mx-2 my-2"
                                value="3"
                                style={{
                                    backgroundColor: vis[2] == 0 ? "rgb(136,136,136)" : "#339966",
                                    fontWeight: "bold",
                                    borderRadius: "20%",
                                }}
                                onClick={changeQuestion}
                            >
                                3
                            </button>
                            <button
                                className="button mx-2 my-2"
                                value="4"
                                style={{
                                    backgroundColor: vis[3] == 0 ? "rgb(136,136,136)" : "#339966",
                                    fontWeight: "bold",
                                    borderRadius: "20%",
                                }}
                                onClick={changeQuestion}
                            >
                                4
                            </button>
                            <button
                                className="button mx-2 my-2"
                                value="5"
                                style={{
                                    backgroundColor: vis[4] == 0 ? "rgb(136,136,136)" : "#339966",
                                    fontWeight: "bold",
                                    borderRadius: "20%",
                                }}
                                onClick={changeQuestion}
                            >
                                5
                            </button>
                            <button
                                className="button mx-2 my-2"
                                value="6"
                                style={{
                                    backgroundColor: vis[5] == 0 ? "rgb(136,136,136)" : "#339966",
                                    fontWeight: "bold",
                                    borderRadius: "20%",
                                }}
                                onClick={changeQuestion}
                            >
                                6
                            </button>
                            <button
                                className="button mx-2 my-2"
                                value="7"
                                style={{
                                    backgroundColor: vis[6] == 0 ? "rgb(136,136,136)" : "#339966",
                                    fontWeight: "bold",
                                    borderRadius: "20%",
                                }}
                                onClick={changeQuestion}
                            >
                                7
                            </button>
                            <button
                                className="button mx-2 my-2"
                                value="8"
                                style={{
                                    backgroundColor: vis[7] == 0 ? "rgb(136,136,136)" : "#339966",
                                    fontWeight: "bold",
                                    borderRadius: "20%",
                                }}
                                onClick={changeQuestion}
                            >
                                8
                            </button>
                            <button
                                className="button mx-2 my-2"
                                value="9"
                                style={{
                                    backgroundColor: vis[8] == 0 ? "rgb(136,136,136)" : "#339966",
                                    fontWeight: "bold",
                                    borderRadius: "20%",
                                }}
                                onClick={changeQuestion}
                            >
                                9
                            </button>
                            <button
                                className="button mx-2 my-2"
                                value="10"
                                style={{
                                    backgroundColor: vis[9] == 0 ? "rgb(136,136,136)" : "#339966",
                                    fontWeight: "bold",
                                    borderRadius: "20%",
                                }}
                                onClick={changeQuestion}
                            >
                                10
                            </button>
                        </div>
                        <div
                            className="questions"
                            style={{ marginLeft: "15%", marginTop: "15%" }}
                        >
                            <h2>
                                Welcome to {props.dataToNext} quiz Level {level}
                            </h2>
                            {questions.map(function (d, idx) {
                                if (idx == currentQuestion)
                                    return (
                                        <>
                                            <div className="question-section">
                                                <div className="question-count">
                                                    <span>Question {currentQuestion + 1}</span>/
                                                    {questions.length}
                                                </div>
                                                <div className="question-text">
                                                    <h4>{d.question}</h4>
                                                </div>
                                            </div>
                                            <div className="answer-section">
                                                {d["options"].map((o, index) => (
                                                    <>
                                                        {" "}
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                onChange={setCurrentOption(index)}
                                                                type="radio"
                                                                id={index}
                                                                name="radio"
                                                                value={o.text}
                                                                checked={index == answers.get(currentQuestion)}
                                                            ></input>
                                                            <label className="form-check-label" for={index}>
                                                                {o.text}
                                                            </label>
                                                        </div>
                                                    </>
                                                ))}
                                            </div>
                                            <br></br>
                                            <div className="d-flex" style={{ position: "absolute" }}>
                                                {currentQuestion != 0 ? (
                                                    <button
                                                        style={{ marginLeft: "5%" }}
                                                        type="button"
                                                        className="btn btn-dark mt-3"
                                                        onClick={PrevQuestion}
                                                    >
                                                        Previous
                                                    </button>
                                                ) : (
                                                    <div></div>
                                                )}
                                                {currentQuestion != questions.length - 1 ? (
                                                    <button
                                                        style={{ marginLeft: "5%" }}
                                                        type="button"
                                                        className="btn btn-dark mt-3"
                                                        onClick={NextQuestion}
                                                    >
                                                        Next
                                                    </button>
                                                ) : (
                                                    <button
                                                        style={{ marginLeft: "5%" }}
                                                        type="button"
                                                        className="btn btn-success mt-3"
                                                        onClick={validate}
                                                    >
                                                        Submit
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    );
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Level2;
