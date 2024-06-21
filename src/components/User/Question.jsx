import React, { useState, useEffect } from 'react';

function Question() {
  const [question, setQuestion] = useState({ Question: '', Options: { a: '', b: '', c: '', d: '' }, correctionOption: '' });
  const [questionsList, setQuestionsList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load existing questions from local storage when the component mounts
    const storedQuestions = JSON.parse(localStorage.getItem('questionsList')) || [];
    setQuestionsList(storedQuestions);
  }, []);

  const handleOptionChange = (e, key) => {
    setQuestion({
      ...question,
      Options: {
        ...question.Options,
        [key]: e.target.value,
      },
    });
  };

  const handleSelectChange = (e) => {
    setQuestion({
      ...question,
      correctionOption: e.target.value,
    });
  };

  const validateForm = () => {
    if (!question.Question.trim()) {
      setError('Question is required');
      return false;
    }
    for (let key in question.Options) {
      if (!question.Options[key].trim()) {
        setError(`Option ${key.toUpperCase()} is required`);
        return false;
      }
    }
    if (!question.correctionOption.trim()) {
      setError('Correct Option selection is required');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Exit early if validation fails
    }

    // Fetch existing questions from local storage
    const storedQuestions = JSON.parse(localStorage.getItem('questionsList')) || [];
    
    // Add the current question to the questions list
    const updatedQuestionsList = [...storedQuestions, question];
    
    // Update the state
    setQuestionsList(updatedQuestionsList);
    
    // Store in local storage
    localStorage.setItem('questionsList', JSON.stringify(updatedQuestionsList));
    
    // Reset the question form
    setQuestion({
      Question: '',
      Options: { a: '', b: '', c: '', d: '' },
      correctionOption: '',
    });
    setError('');
  };

  return (
    <div>
      <h1 className='flex justify-center bg-gray-500 text-white p-4'>Create Your Questions</h1>
      <div className=''>
        <form action="" className='flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor="question" className='text-2xl ml-4'>Question</label>
          <input 
            type="text" 
            id='question'
            name='question'
            placeholder='Enter your Question'
            className='p-3 m-4 border-4 border-black-500 rounded'
            value={question.Question}
            onChange={(e) => setQuestion({ ...question, Question: e.target.value })}
          />
          {Object.keys(question.Options).map((key) => (
            <input
              key={key}
              type="text"
              id={`option-${key}`}
              name={`option-${key}`}
              placeholder={`Option ${key}`}
              className="p-3 m-4 border-4 border-black-500 rounded"
              value={question.Options[key]}
              onChange={(e) => handleOptionChange(e, key)}
            />
          ))}
          <select
            name="correctionOption"
            id="select"
            className="p-3 m-4 border-4 border-black-500 rounded"
            value={question.correctionOption}
            onChange={handleSelectChange}
          >
            <option value="">Select Option</option>
            {Object.keys(question.Options).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <button type="submit" className="p-3 m-4 border-4 border-black-500 rounded bg-blue-500 text-white">
            Submit Question
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default Question;
