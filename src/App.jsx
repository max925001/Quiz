import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Question from './components/User/Question';
import Quiz from './components/User/Quiz';
import HomePage from './components/pages/HomePage';
import Result from './components/User/Result';

function App() {



  const [questionsList, setQuestionsList] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);

  // Load questionsList and quizHistory from localStorage on component mount
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
  };



  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-white text-2xl font-bold">Quiz App</div>
              <div className="space-x-4">
                <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                <Link to="/admin" className="text-white hover:text-gray-300">Admin Page</Link>
                <Link to="/quiz" className="text-white hover:text-gray-300">Take Test</Link>
                <Link to="/result" className="text-white hover:text-gray-300">Result</Link>
              </div>
            </div>
          </nav>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<Question />} />
              <Route path="/quiz" element={<Quiz 
            questionsList={questionsList}
            userAnswers={userAnswers}
            score={score}
            setScore={setScore}
            showReview={showReview}
            setShowReview={setShowReview}
            quizHistory={quizHistory}
            setQuizHistory={setQuizHistory}
            handleOptionChange={handleOptionChange}
            handleSubmit={handleSubmit}
          />} />
              <Route path="/result" element={<Result 
            score={score}
            questionsList={questionsList}
            userAnswers={userAnswers}
            quizHistory={quizHistory}
          />} />
            </Routes>
          </main>
          <footer className="bg-blue-600 p-4 text-center text-white">
            <p>&copy; 2024 Quiz App. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </>
  );
}

export default App;
