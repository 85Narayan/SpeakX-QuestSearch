import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import QuestionList from './components/QuestionList';

const App = () => {
  const [questions, setQuestions] = useState([]);

  return (
    <div className="app-container">
      <h1>Question Search</h1>
      <SearchBar onResults={setQuestions} />
      <QuestionList questions={questions} />
    </div>
  );
};

export default App;
