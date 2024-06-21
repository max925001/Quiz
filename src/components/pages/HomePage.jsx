// src/components/pages/HomePage.jsx

import React from 'react';
import Quizimage from '../../assets/QuizImage.jpg'

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to the Quiz App</h1>
      <p className="text-lg text-center">Take quizzes and test your knowledge!</p>
      <img src={Quizimage} alt=""  className='mx-auto'/>
    </div>
  );
};

export default HomePage;

