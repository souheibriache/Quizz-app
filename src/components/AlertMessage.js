import React, { useContext } from 'react'
import '../AlertMessage.css'
import QuizContext from '../context/QuizContext';
import { SET_CURRENT_QUESTION, SET_CURRENT_ANSWER, SET_SHOW_RESULTS } from '../reducers/types';
function AlertMessage({popup , setVisible}) {
    const {state , dispatch} = useContext(QuizContext);
    const {currentAnswer, currentQuestion, questions} = state;

    const handleDismissClick = () => {
        setVisible()
        if (currentQuestion + 1 < questions.length) {
            dispatch({
                type: SET_CURRENT_QUESTION,
                currentQuestion: currentQuestion + 1,
            });
            dispatch({type: SET_CURRENT_ANSWER, currentAnswer: ''});
            return;
        }
        dispatch({type: SET_SHOW_RESULTS, showResults: true});
        dispatch({type: SET_CURRENT_ANSWER, currentAnswer: ''});
    }
    return (
        <div className={popup.popup ? "popup center active" : "popup center"}>
            <div className="icon" style={{borderColor : popup.success ? " #34f234" : "red"}}>
                {popup.success ? ("😎") :("😫")}
                {/* <i style={{color : popup.success ? " #34f234" : "red"}} className={popup.success ? "fa fa-check" : "fa fa-info"}></i> */}
            </div>
            <div className="title">
                {popup.success ? "Success!" : "failure"}
            </div>
            <div className="description">
                {popup.alertMessage}
            </div>
            <div className="dismiss-btn">
                <button onClick={()=> handleDismissClick()} id="dismiss-popup-btn">
                    {currentQuestion + 1 < questions.length ? "Next question" : "Finish"}
                </button>
            </div>
        </div>
    )
}

export default AlertMessage
