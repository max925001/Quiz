import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

const Quiz = () => {
  const [questionsList, setQuestionsList] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedQuestions = localStorage.getItem('questionsList');
    if (storedQuestions) {
      setQuestionsList(JSON.parse(storedQuestions));
    }

    const storedHistory = localStorage.getItem('quizHistory');
    if (storedHistory) {
      setQuizHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleOptionChange = (questionIndex, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedOption
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let calculatedScore = 0;
    questionsList.forEach((question, index) => {
      if (userAnswers[index] === question.correctionOption) {
        calculatedScore++;
      }
    });

    const newQuizAttempt = {
      score: calculatedScore,
      answers: { ...userAnswers },
      date: new Date().toLocaleString()
    };

    let updatedHistory = [...quizHistory, newQuizAttempt];
    // Keep only the first 5 quiz attempts
    if (updatedHistory.length > 5) {
      updatedHistory = updatedHistory.slice(-5);
    }

    setQuizHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));

    setScore(calculatedScore);
    setShowReview(true);
    navigate('/result', { state: { score: calculatedScore, questionsList, userAnswers, quizHistory: updatedHistory } }); // Navigate to the result page with state
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      {questionsList.length === 0 ? (
        <div>
          <p>Please add your questions. Go to the <Link to="/admin"><button className='bg-green-500 p-4 rounded'>Admin Page</button></Link>.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {questionsList.map((question, index) => (
            <div key={index} className="  p-3 m-4 border-4 border-black-500 rounded overflow-x-scroll ">
              <h3 className="  text-lg  font-semibold w-full  ">{question.Question}</h3>
              {Object.keys(question.Options).map((optionKey) => (
                <div
                  key={optionKey}
                  className={`p-2 rounded w-full 
                    ${showReview && question.correctionOption === optionKey ? 'bg-green-200' : ''}
                    ${showReview && userAnswers[index] === optionKey && userAnswers[index] !== question.correctionOption ? 'bg-red-200' : ''}
                  `}
                >
                  <input
                    type="radio"
                    id={`question-${index}-option-${optionKey}`}
                    name={`question-${index}`}
                    value={optionKey}
                    checked={userAnswers[index] === optionKey}
                    onChange={() => handleOptionChange(index, optionKey)}
                    disabled={showReview} // Disable the input after submission
                  />
                  <label htmlFor={`question-${index}-option-${optionKey}`}>{question.Options[optionKey]}</label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit" className="p-3 m-4 border-4 border-black-500 rounded bg-blue-500 text-white">
            Submit Test
          </button>
        </form>
      )}
    </div>
  );
};

export default Quiz;
