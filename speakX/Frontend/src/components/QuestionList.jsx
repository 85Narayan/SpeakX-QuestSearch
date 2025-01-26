import React from 'react';

const QuestionList = ({ questions }) => {
  return (
    <div className="question-list">
      {questions.length > 0 ? (
        questions.map((q) => (
          <div key={q.id} className="question-item">
            <h3>{q.title}</h3>
            <p>Category: {q.type}</p>
          </div>
        ))
      ) : (
        <p>No questions found.</p>
      )}
    </div>
  );
};

export default QuestionList;
