import React, { useEffect } from "react";

function QuestionList({ formData, gotoPrevious, gotoNext }) {
  console.log(formData); //TODO: REMOVE

  useEffect(() => {
    fetchQuestions();
  }, [formData]);

  const fetchQuestions = () => {};

  
  return <div>QuestionList</div>;
}

export default QuestionList;
