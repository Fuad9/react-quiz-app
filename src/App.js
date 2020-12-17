import React, { useEffect, useState, useCallback } from "react";
import Question from "./components/Question";
import Categories from "./components/Categories";
import ResultWindow from "./components/ResultWindow";
import Scorecard from "./components/Scorecard";
import "./App.css";

export default function App() {
   const [question, setQuestion] = useState(null);
   const [selectedCategory, setselectedCategory] = useState("any");
   const [isCorrect, setIsCorrect] = useState(null);
   const [correctScore, setCorrectScore] = useState(0);
   const [wrongScore, setWrongScore] = useState(0);
   const [clicked, setClicked] = useState(true);

   const getQuestion = useCallback(() => {
      setIsCorrect(null);
      let url = "https://opentdb.com/api.php?amount=10";
      if (selectedCategory !== "any") url += `&category=${selectedCategory}`;
      fetch(url)
         .then((res) => res.json())
         .then((data) => setQuestion(data.results[0]));
   }, [selectedCategory]);

   useEffect(() => {
      getQuestion();
   }, [getQuestion, selectedCategory]);

   function handleQuestionAnswered(answer) {
      const isAnswerCorrect = answer === question.correct_answer;
      setIsCorrect(isAnswerCorrect);

      if (isAnswerCorrect) setCorrectScore((score) => score + 1);
      else setWrongScore((score) => score + 1);
   }

   return (
      <div id="particles-js">
         <div className="app">
            {/* show the result modal ----------------------- */}
            {isCorrect !== null && (
               <ResultWindow isCorrect={isCorrect} question={question} getQuestion={getQuestion} />
            )}

            {/* question header ----------------------- */}
            <div className="question-header">
               <Categories category={selectedCategory} chooseCategory={setselectedCategory} />
               <Scorecard correct={correctScore} wrong={wrongScore} />
            </div>

            {/* the question itself ----------------------- */}
            <div className="question-main">
               {question && (
                  <Question
                     question={question}
                     clicked={clicked}
                     onChange={(val) => setClicked(val)}
                     answerQuestion={handleQuestionAnswered}
                  />
               )}
            </div>

            {/* question footer ----------------------- */}
            <div className="question-footer">
               <button onClick={getQuestion}>Go to next question 👉</button>
            </div>
         </div>
      </div>
   );
}
