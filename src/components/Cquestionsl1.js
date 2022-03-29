import React, { useState } from `react`;

export default function App() {
	const questions = [
		{
			questionText: ` What will be the output of the following C code?
        #include <stdio.h>

        int main()

        {

            int y = 10000;

            int y = 34;

            printf("Hello World! %d\n", y);

            return 0;

        }`,
			answerOptions: [
				{ answerText: `Compile time error`, isCorrect: true },
				{ answerText: `Hello World! 34`, isCorrect: false },
				{ answerText: `Hello World! 1000`, isCorrect: false },
				{ answerText: `Hello World! followed by a junk value`, isCorrect: false },
			],
		},
		{
			questionText: `What will be the output of the following C code on a 64 bit machine?

        #include <stdio.h>

        union Sti

        {

            int nu;

            char m;

        };

        int main()

        {

            union Sti s;

            printf("%d", sizeof(s));

            return 0;

        }`,

			answerOptions: [
				{ answerText: `8 `, isCorrect: false },
				{ answerText: `5`, isCorrect: false },
				{ answerText: `9`, isCorrect: false },
				{ answerText: `4`, isCorrect: true },
			],
		},
		{
			questionText: ` What will be the output of the following C code?
	  #include <stdio.h>

        int const print()

        {

            printf("Sanfoundry.com");

            return 0;

        }

        void main()

        {

            print();

        }`,
			answerOptions: [
				{ answerText: `Error because function name cannot be preceded by const`, isCorrect: false },
				{ answerText: `Sanfoundry.com`, isCorrect: true },
				{ answerText: `Sanfoundry.com is printed infinite times`, isCorrect: false },
				{ answerText: `Blank screen, no output`, isCorrect: false },
			],
		},
		{
			questionText: ` Will the following C code compile without any error?
        #include <stdio.h>

        int main()

        {

            for (int k = 0; k < 10; k++);

                return 0;

        }`,
			answerOptions: [
				{ answerText: `Yes`, isCorrect: false },
				{ answerText: `No`, isCorrect: false },
				{ answerText: `Depends on the C standard implemented by compilers`, isCorrect: true },
				{ answerText: `Error`, isCorrect: false },
			],
		},
        {
			questionText: ` What will be the final value of x in the following C code?

        #include <stdio.h>

        void main()

        {

            int x = 5 * 9 / 3 + 9;

        }`,
			answerOptions: [
				{ answerText: `3.75`, isCorrect: false },
				{ answerText: `depends on compiler`, isCorrect: false },
				{ answerText: `24`, isCorrect: true },
				{ answerText: `3`, isCorrect: false },
			],
		},
        {
			questionText: ` What will be the output of the following C code snippet?

        #include <stdio.h>

        void main()

        {

            1 < 2 ? return 1: return 2;

        }`,
			answerOptions: [
				{ answerText: `returns 1`, isCorrect: false },
				{ answerText: `returns 2`, isCorrect: false },
				{ answerText: `varies`, isCorrect: false },
				{ answerText: `compile time error`, isCorrect: true },
			],
		},
        {
			questionText: `  What will be the value of the following assignment expression?

 (x = foo())!= 1 considering foo() returns 2`,
			answerOptions: [
				{ answerText: `2`, isCorrect: true },
				{ answerText: `true`, isCorrect: false },
				{ answerText: `1 inDoternal and external`, isCorrect: false },
				{ answerText: `0`, isCorrect: false },
			],
		},
        {
			questionText: ` What will be the output of the following C function?

        #include <stdio.h>

        void reverse(int i);

        int main()

        {

            reverse(1);

        }

        void reverse(int i)

        {

            if (i > 5)

                return ;

            printf("%d ", i);

            return reverse((i++, i));

        }`,
			answerOptions: [
				{ answerText: `1 2 3 4 5 `, isCorrect: true },
				{ answerText: `Segmentation fault`, isCorrect: false },
				{ answerText: `Compile time error`, isCorrect: false },
				{ answerText: `Undefined behaviour`, isCorrect: false },
			],
		},
        {
			questionText: ` How many times i value is checked in the following C program?

        #include <stdio.h>

        int main()

        {

            int i = 0;

            while (i < 3)

                i++;

            printf("In while loop\n");

        }`,
			answerOptions: [
				{ answerText: `2`, isCorrect: false },
				{ answerText: `3`, isCorrect: false },
				{ answerText: `4`, isCorrect: true },
				{ answerText: `1`, isCorrect: false },
			],
		},
        {
			questionText: ` What will be the data type returned for the following C function?        
	#include <stdio.h>

        int func()

        {

            return (double)(char)5.0;

        }`,
			answerOptions: [
				{ answerText: `char`, isCorrect: false },
				{ answerText: `int`, isCorrect: true },
				{ answerText: `double`, isCorrect: false },
				{ answerText: `multiple type-casting in return is illegal`, isCorrect: false },
			],
		},
        

	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
		<div className="app">
			{showScore ? (
				<div className="score-section">
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className="question-section">
						<div className="question-count">
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className="question-text">{questions[currentQuestion].questionText}</div>
					</div>
					<div className="answer-section">
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}