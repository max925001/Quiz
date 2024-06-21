import React from 'react';

const Result = ({ score, questionsList, userAnswers, quizHistory }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quiz Result</h1>
      
      {/* Displaying score */}
      {score !== null && (
        <h2 className="text-xl font-semibold">Your Score: {score} / {questionsList.length}</h2>
      )}

      <div>
        <h3 className="text-lg font-semibold">Review Your Answers:</h3>
        {questionsList.map((question, index) => (
          <div key={index} className="p-3 m-4 border-4 border-black-500 rounded">
            <h4 className="text-md font-medium">{question.Question}</h4>
            {Object.keys(question.Options).map((optionKey) => (
              <div
                key={optionKey}
                className={`p-2 rounded 
                  ${userAnswers[index] === optionKey && userAnswers[index] === question.correctionOption ? 'bg-green-200' : ''}
                  ${userAnswers[index] === optionKey && userAnswers[index] !== question.correctionOption ? 'bg-red-200' : ''}
                  ${question.correctionOption === optionKey ? 'bg-green-200' : ''}
                `}
              >
                <p>
                  {question.Options[optionKey]}
                  {userAnswers[index] === optionKey && (userAnswers[index] === question.correctionOption ? ' (Your Answer - Correct)' : ' (Your Answer - Incorrect)')}
                  {question.correctionOption === optionKey && ' (Correct Answer)'}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold">Quiz History</h3>
        {quizHistory.map((attempt, attemptIndex) => (
          <div key={attemptIndex} className="p-3 m-4 border-4 border-black-500 rounded">
            <h4 className="text-md font-medium">Attempt on {attempt.date}</h4>
            <p>Score: {attempt.score} / {questionsList.length}</p>
            <h5 className="text-md font-medium">Answers:</h5>
            {questionsList.map((question, index) => (
              <div
                key={index}
                className={`p-2 rounded 
                  ${attempt.answers[index] === question.correctionOption ? 'bg-green-200' : ''}
                  ${attempt.answers[index] === userAnswers[index] && userAnswers[index] !== question.correctionOption ? 'bg-red-200' : ''}
                `}
              >
                <p>
                  {question.Options[attempt.answers[index]]}
                  {attempt.answers[index] === userAnswers[index] && (userAnswers[index] === question.correctionOption ? ' (Your Answer - Correct)' : ' (Your Answer - Incorrect)')}
                  {question.correctionOption === attempt.answers[index] && ' (Correct Answer)'}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
