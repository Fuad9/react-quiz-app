import React from "react";
import shuffle from "lodash.shuffle";
import useSound from "use-sound";
import sounds from "../soundEffects/sound1.wav";

export default function Question({ question, answerQuestion, clicked, onChange }) {
   const answers = shuffle([...question.incorrect_answers, question.correct_answer]);

   const [play] = useSound(sounds, {
      sprite: {
         in: [500, 10000],
         out: [1500, 2000],
      },
   });

   return (
      <div className="question">
         <h2 dangerouslySetInnerHTML={{ __html: question.question }} />

         {answers.map((answer, index) => (
            <button
               key={index}
               onClick={() => {
                  play({ id: clicked ? "in" : "out" });
                  onChange(clicked);
                  answerQuestion(answer);
               }}
               dangerouslySetInnerHTML={{ __html: answer }}
            />
         ))}
      </div>
   );
}
