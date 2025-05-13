import React from "react";

function QuestionContainer({ questions }) {
  return (
    <>
      {questions.map((questionItem, index) => (
        <div
          key={index}
          className="p-3 flex flex-col bg-amber-50 items-start gap-3 border border-amber-300 rounded-xl "
        >
          <h2 className="font-semibold">Q. {questionItem.question}</h2>
          <h2 className="font-semibold text-primary">
            Type: {questionItem.type}
          </h2>
        </div>
      ))}
    </>
  );
}

export default QuestionContainer;
