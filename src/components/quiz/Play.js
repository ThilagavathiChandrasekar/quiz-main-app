// import React, { Component, Fragment } from 'react';
// import { Helmet } from 'react-helmet';
// import M from 'materialize-css';
// import classnames from 'classnames';
// import '../../styles/Play.css';

// import { FaClock, FaGratipay } from "react-icons/fa";
// import {FaLightbulb} from "react-icons/fa";

// import questions from '../../questions.json';
// import isEmpty from '../../utils/is-empty';

// import correctNotification from '../../assets/audio/correct-answer.mp3';
// import wrongNotification from '../../assets/audio/wrong-answer.mp3';
// import buttonSound from '../../assets/audio/button-sound.mp3';

// class Play extends Component {
//     constructor (props) {
//         super(props);
//         this.state = {
//             questions,
//             currentQuestion: {},
//             nextQuestion: {},
//             previousQuestion: {},
//             answer: '',
//             numberOfQuestions: 0,
//             numberOfAnsweredQuestions: 0,
//             currentQuestionIndex: 0,
//             score: 0,
//             correctAnswers: 0,
//             wrongAnswers: 0,
//             hints: 5,
//             fiftyFifty: 2,
//             usedFiftyFifty: false,
//             nextButtonDisabled: false,
//             previousButtonDisabled: true,
//             previousRandomNumbers: [],
//             time: {}
//         };
//         this.interval = null;
//         this.correctSound = React.createRef();
//         this.wrongSound = React.createRef();
//         this.buttonSound = React.createRef();
//     }

//     componentDidMount () {
//         const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
//         this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
//         this.startTimer();
//     }

//     componentWillUnmount () {
//         clearInterval(this.interval);
//     }

//     displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
//         let { currentQuestionIndex } = this.state;   
//         if (!isEmpty(this.state.questions)) {
//             questions = this.state.questions;
//             currentQuestion = questions[currentQuestionIndex];
//             nextQuestion = questions[currentQuestionIndex + 1];
//             previousQuestion = questions[currentQuestionIndex - 1];
//             const answer = currentQuestion.answer;
//             this.setState({
//                 currentQuestion,
//                 nextQuestion,
//                 previousQuestion,
//                 numberOfQuestions: questions.length,
//                 answer,
//                 previousRandomNumbers: []
//             }, () => {
//                 this.showOptions();
//                 this.handleDisableButton();
//             });
//         }     
//     };

//     handleOptionClick = (e) => {
//         if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
//             this.correctTimeout = setTimeout(() => {
//                 this.correctSound.current.play();
//             }, 500);
//             this.correctAnswer();
//         } else {
//             this.wrongTimeout = setTimeout(() => {
//                 this.wrongSound.current.play();
//             }, 500);
//             this.wrongAnswer();
//         }
//     }

//     handleNextButtonClick = () => {
//         this.playButtonSound();
//         if (this.state.nextQuestion !== undefined) {
//             this.setState(prevState => ({
//                 currentQuestionIndex: prevState.currentQuestionIndex + 1
//             }), () => {
//                 this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
//             });
//         }
//     };

//     handlePreviousButtonClick = () => {
//         this.playButtonSound();
//         if (this.state.previousQuestion !== undefined) {
//             this.setState(prevState => ({
//                 currentQuestionIndex: prevState.currentQuestionIndex - 1
//             }), () => {
//                 this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
//             });
//         }
//     };

//     handleQuitButtonClick = () => {
//         this.playButtonSound();
//         if (window.confirm('Are you sure you want to quit?')) {
//             this.props.history.push('/');
//         }
//     };

//     handleButtonClick = (e) => {
//         switch (e.target.id) {
//             case 'next-button':
//                 this.handleNextButtonClick();
//                 break;

//             case 'previous-button':
//                 this.handlePreviousButtonClick();
//                 break;

//             case 'quit-button':
//                 this.handleQuitButtonClick();
//                 break;

//             default:
//                 break;
//         }
        
//     };

//     playButtonSound = () => {
//         this.buttonSound.current.play();
//     };

//     correctAnswer = () => {
//         M.toast({
//             html: 'Correct Answer!',
//             classes: 'toast-valid',
//             displayLength: 1500
//         });
//         this.setState(prevState => ({
//             score: prevState.score + 1,
//             correctAnswers: prevState.correctAnswers + 1,
//             currentQuestionIndex: prevState.currentQuestionIndex + 1,
//             numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
//         }), () => {            
//             if (this.state.nextQuestion === undefined) {
//                 this.endGame();
//             } else {
//                 this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
//             }
//         });
//     }

//     wrongAnswer = () => {
//         navigator.vibrate(1000);
//         M.toast({
//             html: 'Wrong Answer!',
//             classes: 'toast-invalid',
//             displayLength: 1500
//         });
//         this.setState(prevState => ({
//             wrongAnswers: prevState.wrongAnswers + 1,
//             currentQuestionIndex: prevState.currentQuestionIndex + 1,
//             numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
//         }), () => {
//             if (this.state.nextQuestion === undefined) {
//                 this.endGame();
//             } else {
//                 this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
//             }
//         });
//     }

//     showOptions = () => {
//         const options = Array.from(document.querySelectorAll('.option'));

//         options.forEach(option => {
//             option.style.visibility = 'visible';
//         });

//         this.setState({
//             usedFiftyFifty: false
//         });
//     }

//     handleHints = () => {
//         if (this.state.hints > 0) {
//             const options = Array.from(document.querySelectorAll('.option'));
//             let indexOfAnswer;

//             options.forEach((option, index) => {
//                 if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
//                     indexOfAnswer = index;
//                 }
//             });

//             while (true) {
//                 const randomNumber = Math.round(Math.random() * 3);
//                 if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
//                     options.forEach((option, index) => {
//                         if (index === randomNumber) {
//                             option.style.visibility = 'hidden';
//                             this.setState((prevState) => ({
//                                 hints: prevState.hints - 1,
//                                 previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
//                             }));
//                         }
//                     });
//                     break;
//                 }
//                 if (this.state.previousRandomNumbers.length >= 3) break;
//             }
//         }
//     }

//     handleFiftyFifty = () => {
//         if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
//             const options = document.querySelectorAll('.option');
//             const randomNumbers = [];
//             let indexOfAnswer;

//             options.forEach((option, index) => {
//                 if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
//                     indexOfAnswer = index;
//                 }
//             });

//             let count = 0;
//             do {
//                 const randomNumber = Math.round(Math.random() * 3);
//                 if (randomNumber !== indexOfAnswer) {
//                     if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
//                             randomNumbers.push(randomNumber);
//                             count ++;
//                     } else {
//                         while (true) {
//                             const newRandomNumber = Math.round(Math.random() * 3);
//                             if (!randomNumbers.includes(newRandomNumber) && newRandomNumber !== indexOfAnswer) {
//                                 randomNumbers.push(newRandomNumber);
//                                 count ++;
//                                 break;
//                             }
//                         }
//                     }
//                 }
//             } while (count < 2);

//             options.forEach((option, index) => {
//                 if (randomNumbers.includes(index)) {
//                     option.style.visibility = 'hidden';
//                 }
//             });
//             this.setState(prevState => ({
//                 fiftyFifty: prevState.fiftyFifty - 1,
//                 usedFiftyFifty: true
//             }));
//         }
//     }

//     startTimer = () => {
//         const countDownTime = Date.now() + 180000;
//         this.interval = setInterval(() => {
//             const now = new Date();
//             const distance = countDownTime - now;

//             const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//             if (distance < 0) {
//                 clearInterval(this.interval);
//                 this.setState({
//                     time: {
//                         minutes: 0,
//                         seconds: 0
//                     }
//                 }, () => {
//                     this.endGame();
//                 });
//             } else {
//                 this.setState({
//                     time: {
//                         minutes,
//                         seconds,
//                         distance
//                     }
//                 });
//             }
//         }, 1000);
//     }

//     handleDisableButton = () => {
//         if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
//             this.setState({
//                 previousButtonDisabled: true
//             });
//         } else {
//             this.setState({
//                 previousButtonDisabled: false
//             });
//         }

//         if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
//             this.setState({
//                 nextButtonDisabled: true
//             });
//         } else {
//             this.setState({
//                 nextButtonDisabled: false
//             });
//         }
//     }

//     endGame = () => {
//         alert('Quiz has eneded!');
//         const { state } = this;
//         const playerStats = {
//             score: state.score,
//             numberOfQuestions: state.numberOfQuestions,
//             numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
//             correctAnswers: state.correctAnswers,
//             wrongAnswers: state.wrongAnswers,
//             fiftyFiftyUsed: 2 - state.fiftyFifty,
//             hintsUsed: 5 - state.hints
//         };
//         setTimeout(() => {
//             this.props.history.push('/play/quizSummary', playerStats);
//         }, 1000);
//     }

//     render () {
//         const { 
//             currentQuestion, 
//             currentQuestionIndex, 
//             fiftyFifty, 
//             hints, 
//             numberOfQuestions,
//             time 
//         } = this.state;

//         return (
//             <Fragment>
//                 <Helmet><title>Quiz Page</title></Helmet>
//                 <Fragment>
//                     <audio ref={this.correctSound} src={correctNotification}></audio>
//                     <audio ref={this.wrongSound} src={wrongNotification}></audio>
//                     <audio ref={this.buttonSound} src={buttonSound}></audio>
//                 </Fragment>
//                 <div className="questions">
//                     <p className='quizmode'>Quiz Mode</p>



//                    <div className="lifeline-container">
//                         <p> <span onClick={this.handleFiftyFifty} className='lifeline-icon'><FaGratipay />
//                                 <span className="lifeline">{fiftyFifty}</span>
//                                 </span> 
//                             </p>
//                             <p> 
//                                 <span onClick={this.handleHints}  className='lifeline-icon'>< FaLightbulb/>
//                                     <span className="lifeline">{hints}</span>
//                                 </span>
//                             </p>
//                     </div>
                    
//                     <div className="timer-container">
//                         <p>
//                             <span className="float-left" style={{ float: 'left' }}>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
//                             <span className={classnames('float-right valid', {
//                                 'warning': time.distance <= 120000,
//                                 'invalid': time.distance < 30000
//                             })}>
//                                 {time.minutes}:{time.seconds}
//                             <span  className=" clock mdi mdi-clock-outline mdi-24px"><FaClock /></span></span>
//                         </p>
//                     </div>

                    
//                     <h5>{currentQuestion.question}</h5>
//                     <div className="options-container">
//                         <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
//                         <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
//                     </div>
//                     <div className="options-container">
//                         <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
//                         <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
//                     </div>

//                     <div className="button-container">
//                         <button 
//                             className={classnames('', {'disable': this.state.previousButtonDisabled})}
//                             id="previous-button" 
//                             onClick={this.handleButtonClick}>
//                             Previous
//                         </button>
//                         <button 
//                             className={classnames('', {'disable': this.state.nextButtonDisabled})}
//                             id="next-button" 
//                             onClick={this.handleButtonClick}>
//                                 Next
//                             </button>
//                         <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>
//                     </div>
//                 </div>
//             </Fragment>
//         );
//     }
// }

// export function PlayWithRouter (props) {
//     const navigate = useNavigate();
//     return (<Play navigate={navigate}></Play>)
// }

// export default Play;


import React, {Component, Fragment} from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';
import { Link } from "react-router-dom";
import questions from '../../questions.json';
import isEmpty from '../../utils/is-empty';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import '../../styles/Play.css';

//icons
import { FaClock, FaGratipay } from "react-icons/fa";
import {FaLightbulb} from "react-icons/fa";

class Play extends Component {

    constructor (props){
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestion: 0,
            numberOfAnswerdQuestion: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            nextButtonDisabled:false,
            previousButtonDisabled:true,
            previousRandomNumber: [],
            time: {}
        };
        this.interval = null;
    }
    
    componentDidMount () {
        const { questions,currentQuestion,nextQuestion,previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, previousQuestion, nextQuestion);
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

  displayQuestions = (questions = this.state.questions, currentQuestion,nextQuestion,previousQuestion) => {
    let { currentQuestionIndex } = this.state;
    if(!isEmpty (this.state.questions) ) {
        questions = this.state.questions;
        currentQuestion = questions[currentQuestionIndex];
        nextQuestion = questions[currentQuestionIndex + 1];
        previousQuestion =questions[currentQuestionIndex - 1];
        const answer =currentQuestion.answer;
            this.setState ({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestion: questions.length,
                answer,
                previousRandomNumber:[]
            },()=>{
                this.showaoptions();
                this.handleDisableButton();
            } );
        }
  };

  handleOptionClick = (e) => {
        if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }
    }

handleNextButtonClick = () => {
    if(this.state.nextQuestion !== undefined) {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex+1
        }), () => {
            this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
    }
};

handlePreviousButtonClick = () => {
    if(this.state.previousQuestion !== undefined) {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex - 1
        }), () => {
            this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        } )
    }
};

handleQuitButtonClick =() => {
    if(window.confirm('Are you sure you want to quit?')){
        window.location.href = '/';
    }
};

handleButtonClick = (e) => {
    switch (e.target.id){
        case 'next-button':
            this.handleNextButtonClick();
            break;

        case 'previous-button' :
            this.handlePreviousButtonClick();
            break;
        
        case 'quit-button':
            this.handleQuitButtonClick();
            break;
        
        default:
             break;
    }
}
    
correctAnswer = () => {
    M.toast({
        html: 'Correct Answer!',
        classes: 'toast-valid',
        displayLength: 900
    });
    this.setState(prevState => ({
        score: prevState.score+1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex:prevState.currentQuestionIndex+1,
        numberOfAnswerdQuestion:prevState.numberOfAnswerdQuestion +1
    }), () =>{
        if(this.state.nextQuestion === undefined){
            this.endGame();
        }else{
            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion, this.state.previousQuestion);
        }

    } );
}

wrongAnswer = () => {
    navigator.vibrate(900);
    M.toast({
        html: 'Wrong Answer!',
        classes: 'toast-invalid',
        displayLength: 900
    });
    this.setState(prevState => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex +1,
        numberOfAnswerdQuestion: prevState.numberOfAnswerdQuestion +1
    }), () => {
        if(this.state.nextQuestion === undefined){
            this.endGame();
        }else{
            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion, this.state.previousQuestion);
        }
    });
}

showaoptions = () => {
    const options = Array.from(document.querySelectorAll('.option'));

    options.forEach(option => {
        option.style.visibility = 'visible';
    });
}

handleHints = () =>{
    if(this.state.hints > 0){ 
        const options = Array.from( document.querySelectorAll('.option'));
        let indexOfAnswer;

        options.forEach((option, index) => {
            if(option.innerHTML.toLowerCase()=== this.state.answer.toLowerCase()){
                indexOfAnswer = index;
            }
        });

            while(true){
                const randomNumber =Math.round(Math.random()*3);
                if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumber.includes(randomNumber)){
                    options.forEach((option, index) => {
                        if(index === randomNumber){
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints:prevState.hints - 1,
                                previousRandomNumber: prevState.previousRandomNumber.concat(randomNumber)
                            }));    
                        }
                    });
                    break;
                }
                if(this.state.previousRandomNumber.length>=3)
                    break;
            }
        }
    }

    handleFiftyFifty = () => {
        if(this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
            const options = document.querySelectorAll('.option');
            const randomNumber = [];
            let indexOfAnswer;

            options.forEach((option, index) => {
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            let count=0;
            do{
                const randomNumbers = Math.round(Math.random() * 3);
                if(randomNumbers !== indexOfAnswer){
                    if(randomNumber.length < 2 && !randomNumber.includes(randomNumbers) && !randomNumber.includes(indexOfAnswer)){
                        randomNumber.push(randomNumbers);
                        count ++;
                    } else{
                        while(true) {
                            const newRandomNumber = Math.round(Math.random() * 3);
                                if(!randomNumber.includes(newRandomNumber) && !randomNumber.includes(indexOfAnswer)){
                                    randomNumber.push(newRandomNumber);
                                    count ++;
                                    break;
                                }
                        }
                    }
                }
            } while(count < 2);
            options.forEach((option ,index) => {
                if(randomNumber.includes(index)){
                    option.style.visibility = 'hidden';
                }
            });
            this.setState(prevState => ({
                fiftyFifty: prevState.fiftyFifty - 1,
                usedFifty: true
            }));
        }
    }

startTimer = () => {
    const countDownTime = Date.now() + 400000;
    this.interval = setInterval(() => {
        const now = new Date();
        const distance = countDownTime - now;

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60 )) / 1000 );

        if(distance < 0){
            clearInterval(this.interval);
            this.setState({
                time: {
                    minutes:0,
                    seconds:0
                }
            }, () => {
                this.endGame();
            });
        } else{
            this.setState({
                time: {
                    minutes,
                    seconds
                }
            });
        }
    }, 1000);
}

endGame = () => {
    alert('Quiz has ended!...');
    const { state } = this;
    const playerStats= {
            score: state.score,
            numberOfQuestion: state.numberOfQuestion,
            numberOfAnswerdQuestion: state.numberOfAnswerdQuestion,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            fiftyFiftyUsed: 2 - state.fiftyFifty,
            hintsUsed: 5 - state.hints
    }
    document.write("<h2 style='margin: 25px; text-align:center; color:#b02d2d;'>Quiz has ended</h2>");

    if(playerStats.score <= 30){ 
        document.write("<h2 style='margin: 25px; text-align:center; color:#36e218;'>You need more practice</h2>");
    }
    else if(playerStats.score > 30 && playerStats.score <= 50) {
        document.write("<h2 style='margin: 25px; text-align:center; color:#36e218;'> Better luck next time</h2>");
    }
    else if(playerStats.score <=70 && playerStats.score > 50) {
        document.write("<h2 style='margin: 25px; text-align:center; color:#36e218;'> You can do it</h2>");
    }
    else if(playerStats.score >= 71 && playerStats.score <= 84) {
        document.write("<h2 style='margin: 25px; text-align:center; color:#36e218;'>You did great</h2>");
    }
    else{
        document.write("<h2 style='margin: 25px; text-align:center; color:#36e218;'>You are an absolute genius</h2>");
    }
    document.write("<p style='margin: 25px; text-align:center; color:#1d54c3;'>Score: " + playerStats.score + "</p>" );
    document.write("<p style='margin: 25px; text-align:center; color:#1d54c3;'>Number of Answered Questions: " + playerStats.numberOfAnswerdQuestion + "</p>");
    document.write("<p style='margin: 25px; text-align:center; color:#1d54c3;'>Number Of Questions: " + playerStats.numberOfQuestion + "</p>");
    document.write("<p style='margin: 25px; text-align:center; color:#1d54c3;'>Correct Answer: " + playerStats.correctAnswers + "</p>");
    document.write("<p style='margin: 25px; text-align:center; color:#1d54c3;'>Wrong Answer: " + playerStats.wrongAnswers + "</p>");
    document.write("<p style='margin: 25px; text-align:center; color:#1d54c3;'>FiftyFifty Used: " + playerStats.fiftyFiftyUsed + "</p>");
    document.write("<p style='margin: 25px; text-align:center; color:#1d54c3;'>Hints used: " + playerStats.hintsUsed + "</p>");

    this.props.navigate('/play/quizSummery', playerStats)
    // window.location.href = '/play/quizSummery';
}

handleDisableButton = () =>{
    if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
        this.setState({
            previousButtonDisabled:true
        });
    } else{
        this.setState({
            previousButtonDisabled:false
        });
    }

    if(this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestion) {
        this.setState({
            nextButtonDisabled:true
        });
    } else{
        this.setState({
            nextButtonDisabled:false
        });
    }
}

  render() {
        const { currentQuestion, 
                currentQuestionIndex, 
                numberOfQuestion, 
                hints, 
                fiftyFifty,
                time
            } = this.state;


    return(
        <Fragment>
            <Helmet> <title>Question's </title></Helmet>
        <div className="question">
        <h2 className='quizmode'>Quiz Mode</h2>
            <div className="lifeline-container">
                   <p> <span onClick={this.handleFiftyFifty} className='lifeline-icon'><FaGratipay />
                         <span className="lifeline">{fiftyFifty}</span>
                        </span> 
                    </p>
                    <p> 
                        <span onClick={this.handleHints}  className='lifeline-icon'>< FaLightbulb/>
                            <span className="lifeline">{hints}</span>
                        </span>
                     </p>
            </div> 

            <div >
                <span className='float-left' style={{float:'left'}}>{currentQuestionIndex + 1} of {numberOfQuestion}</span>
                <span className='float-right' style={{float:'right'}}>{time.minutes}:{time.seconds}<span className="clock"><FaClock /></span></span>
            </div>

            <p className='questions'> {currentQuestion.question} </p>
            
            <div className='options-container'>
                <p onClick={this.handleOptionClick} className='option' data-aos="zoom-in">{currentQuestion.optionA}</p>
                <p onClick={this.handleOptionClick} className='option' data-aos="zoom-in">{currentQuestion.optionB}</p>
            </div>
            <div className='options-container'>
                <p onClick={this.handleOptionClick} className='option' data-aos="zoom-in">{currentQuestion.optionC}</p>
                <p onClick={this.handleOptionClick} className='option' data-aos="zoom-in">{currentQuestion.optionD}</p>
            </div>

            <div className="button-container">
                <button
                    className = {classnames('',{'disable' : this.state.previousButtonDisabled})}
                    id='previous-button' 
                    onClick={this.handleButtonClick}>
                        Previous
                 </button>

                <button
                    className = {
                        
                        ('',{'disable': this.state.nextButtonDisabled})}
                    id='next-button'
                    onClick={this.handleButtonClick}>
                        Next
                  </button>
                <Link to="/quiz-main-app">
                    <button id='quit-button' onClick={this.handleButtonClick}>Quit</button>
                </Link>
            </div>

            </div>
        </Fragment>
      );
  }
}

export function PlayWithRouter (props) {
    const navigate = useNavigate();
    return (<Play navigate={navigate}></Play>)
}

export default Play;

