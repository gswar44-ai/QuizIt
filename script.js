// ==========================================
// QUIZ IT — COMPLETE QUIZ ENGINE
// ==========================================

const quizCategories = {

    science: [
        {
            question: "Which gas do plants mainly use for photosynthesis?",
            options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
            answer: 2
        },
        {
            question: "What is the SI unit of force?",
            options: ["Joule", "Newton", "Watt", "Pascal"],
            answer: 1
        },
        {
            question: "Which organ pumps blood around the human body?",
            options: ["Brain", "Lungs", "Heart", "Kidney"],
            answer: 2
        },
        {
            question: "What is the basic unit of life?",
            options: ["Tissue", "Cell", "Organ", "Atom"],
            answer: 1
        },
        {
            question: "Which planet is closest to the Sun?",
            options: ["Venus", "Earth", "Mercury", "Mars"],
            answer: 2
        }
    ],

    mathematics: [
        {
            question: "What is 12 × 8?",
            options: ["86", "96", "108", "112"],
            answer: 1
        },
        {
            question: "What is √144?",
            options: ["10", "11", "12", "14"],
            answer: 2
        },
        {
            question: "What is 15²?",
            options: ["125", "200", "225", "250"],
            answer: 2
        },
        {
            question: "What is 3/4 + 1/4?",
            options: ["1/2", "1", "3/4", "2"],
            answer: 1
        },
        {
            question: "What is 5 + 7 × 2?",
            options: ["24", "19", "17", "14"],
            answer: 1
        }
    ],

    space: [
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: 1
        },
        {
            question: "What is the largest planet in our Solar System?",
            options: ["Earth", "Saturn", "Jupiter", "Neptune"],
            answer: 2
        },
        {
            question: "Which star is at the center of our Solar System?",
            options: ["Sirius", "Polaris", "The Sun", "Vega"],
            answer: 2
        },
        {
            question: "Which planet is famous for its rings?",
            options: ["Mars", "Saturn", "Venus", "Mercury"],
            answer: 1
        },
        {
            question: "What is Earth's natural satellite?",
            options: ["Mars", "The Moon", "The Sun", "Venus"],
            answer: 1
        }
    ],

    geography: [
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: 3
        },
        {
            question: "Which is the largest continent?",
            options: ["Africa", "Asia", "Europe", "Australia"],
            answer: 1
        },
        {
            question: "What is the capital of India?",
            options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
            answer: 1
        },
        {
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            answer: 2
        },
        {
            question: "Which is the largest country by area?",
            options: ["China", "USA", "Canada", "Russia"],
            answer: 3
        }
    ],

    history: [
        {
            question: "When did India gain independence?",
            options: ["1945", "1946", "1947", "1950"],
            answer: 2
        },
        {
            question: "Who built the Taj Mahal?",
            options: ["Akbar", "Shah Jahan", "Aurangzeb", "Babur"],
            answer: 1
        },
        {
            question: "Who was the first Prime Minister of independent India?",
            options: [
                "Mahatma Gandhi",
                "Jawaharlal Nehru",
                "Sardar Patel",
                "B. R. Ambedkar"
            ],
            answer: 1
        },
        {
            question: "Who is known as the Father of the Nation in India?",
            options: [
                "Subhas Chandra Bose",
                "Mahatma Gandhi",
                "Bhagat Singh",
                "Sardar Patel"
            ],
            answer: 1
        },
        {
            question: "Which civilization developed around the Indus River?",
            options: [
                "Roman Civilization",
                "Indus Valley Civilization",
                "Greek Civilization",
                "Mayan Civilization"
            ],
            answer: 1
        }
    ],

    gk: [
        {
            question: "Which is the largest mammal?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
            answer: 1
        },
        {
            question: "Which country is known as the Land of the Rising Sun?",
            options: ["China", "Japan", "India", "Thailand"],
            answer: 1
        },
        {
            question: "How many days are there in a leap year?",
            options: ["365", "366", "364", "367"],
            answer: 1
        },
        {
            question: "Which is the fastest land animal?",
            options: ["Lion", "Horse", "Cheetah", "Tiger"],
            answer: 2
        },
        {
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            answer: 2
        }
    ]
};


// ==========================================
// QUIZ STATE
// ==========================================

let questions = quizCategories.gk;
let currentQuestion = 0;
let selectedAnswers = [];
let quizStarted = false;


// ==========================================
// START QUIZ
// ==========================================

function startQuiz(category = "gk") {

    if (quizCategories[category]) {
        questions = quizCategories[category];
    }

    currentQuestion = 0;

    selectedAnswers =
        new Array(questions.length).fill(null);

    quizStarted = true;

    showQuiz();
}


// ==========================================
// CATEGORY BUTTON
// ==========================================

function openCategory(category) {

    if (!quizCategories[category]) {
        return;
    }

    startQuiz(category);
}


// ==========================================
// SHOW QUIZ
// ==========================================

function showQuiz() {

    let quizArea =
        document.getElementById("quizArea");

    if (!quizArea) {
        createQuizInterface();
    }

    renderQuestion();
}


// ==========================================
// CREATE QUIZ INTERFACE
// ==========================================

function createQuizInterface() {

    const main =
        document.querySelector("main");

    if (!main) return;

    const quizArea =
        document.createElement("section");

    quizArea.id = "quizArea";
    quizArea.className = "quiz-area";

    quizArea.innerHTML = `

        <div class="quiz-header">

            <span id="questionCounter">
                Question 1 / ${questions.length}
            </span>

            <span id="scoreDisplay">
                Score: 0
            </span>

        </div>

        <div class="progress-container">

            <div
                id="progressBar"
                class="progress-bar">
            </div>

        </div>

        <div class="question-card">

            <h2 id="questionText"></h2>

            <div id="optionsContainer"></div>

        </div>

        <div class="quiz-navigation">

            <button
                id="previousButton"
                onclick="previousQuestion()">

                ← Previous

            </button>

            <button
                id="nextButton"
                onclick="nextQuestion()">

                Next →

            </button>

        </div>

    `;

    main.innerHTML = "";

    main.appendChild(quizArea);

    addQuizStyles();
}


// ==========================================
// RENDER QUESTION
// ==========================================

function renderQuestion() {

    const question =
        questions[currentQuestion];

    const questionText =
        document.getElementById("questionText");

    const optionsContainer =
        document.getElementById("optionsContainer");

    const counter =
        document.getElementById("questionCounter");

    const progress =
        document.getElementById("progressBar");

    const previous =
        document.getElementById("previousButton");

    if (!questionText) return;

    questionText.textContent =
        question.question;

    counter.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    optionsContainer.innerHTML = "";

    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer-option";

            button.textContent =
                option;

            if (
                selectedAnswers[currentQuestion]
                === index
            ) {

                button.classList.add("selected");

            }

            button.onclick = function () {

                selectedAnswers[currentQuestion] =
                    index;

                renderQuestion();

            };

            optionsContainer.appendChild(button);

        }
    );

    previous.disabled =
        currentQuestion === 0;

    updateScorePreview();
}


// ==========================================
// NEXT
// ==========================================

function nextQuestion() {

    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        renderQuestion();

    } else {

        showResults();

    }
}


// ==========================================
// PREVIOUS
// ==========================================

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        renderQuestion();

    }
}


// ==========================================
// SCORE
// ==========================================

function calculateScore() {

    let score = 0;

    selectedAnswers.forEach(
        (answer, index) => {

            if (answer === null) {
                return;
            }

            if (
                answer ===
                questions[index].answer
            ) {

                score += 5;

            } else {

                score -= 3;

            }

        }
    );

    return score;
}


function updateScorePreview() {

    const display =
        document.getElementById("scoreDisplay");

    if (display) {

        display.textContent =
            `Score: ${calculateScore()}`;

    }
}


// ==========================================
// RESULTS
// ==========================================

function showResults() {

    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    selectedAnswers.forEach(
        (answer, index) => {

            if (answer === null) {

                unattempted++;

            } else if (
                answer ===
                questions[index].answer
            ) {

                correct++;

            } else {

                incorrect++;

            }

        }
    );

    const score =
        calculateScore();

    const percentage =
        Math.round(
            (correct / questions.length) * 100
        );

    const main =
        document.querySelector("main");

    main.innerHTML = `

        <section class="result-card">

            <div class="result-icon">
                🏆
            </div>

            <h1>
                Quiz Complete!
            </h1>

            <div class="final-score">
                ${score}
            </div>

            <p>
                Final Score
            </p>

            <div class="result-stats">

                <div>
                    <strong>${correct}</strong>
                    <span>Correct</span>
                </div>

                <div>
                    <strong>${incorrect}</strong>
                    <span>Incorrect</span>
                </div>

                <div>
                    <strong>${unattempted}</strong>
                    <span>Unattempted</span>
                </div>

                <div>
                    <strong>${percentage}%</strong>
                    <span>Accuracy</span>
                </div>

            </div>

            <button
                class="primary-btn"
                onclick="restartQuiz()">

                🔄 Try Again

            </button>

            <button
                class="secondary-btn"
                onclick="location.reload()">

                🏠 Back Home

            </button>

        </section>

    `;

    saveQuizResult(score, correct);
}


// ==========================================
// RESTART
// ==========================================

function restartQuiz() {

    currentQuestion = 0;

    selectedAnswers =
        new Array(questions.length).fill(null);

    showQuiz();
}


// ==========================================
// SAVE RESULT
// ==========================================

function saveQuizResult(score, correct) {

    const result = {

        score: score,
        correct: correct,
        total: questions.length,
        date: new Date().toLocaleString()

    };

    localStorage.setItem(
        "quizItLastResult",
        JSON.stringify(result)
    );
}


// ==========================================
// QUIZ STYLES
// ==========================================

function addQuizStyles() {

    if (
        document.getElementById(
            "quizEngineStyles"
        )
    ) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "quizEngineStyles";

    style.textContent = `

        .quiz-area {
            max-width: 850px;
            margin: 60px auto;
            padding: 25px;
        }

        .quiz-header {
            display: flex;
            justify-content: space-between;
            gap: 15px;
            margin-bottom: 15px;
            font-weight: 800;
        }

        .progress-container {
            height: 10px;
            background: #e6e8f0;
            border-radius: 20px;
            overflow: hidden;
            margin-bottom: 30px;
        }

        .progress-bar {
            height: 100%;
            width: 0;
            background: linear-gradient(
                90deg,
                #6437ff,
                #00a8ff
            );
            transition: width .3s ease;
        }

        .question-card {
            padding: 35px;
            background: white;
            border-radius: 25px;
            box-shadow:
                0 15px 50px
                rgba(30,40,80,.1);
        }

        .question-card h2 {
            margin-bottom: 25px;
            font-size: 28px;
        }

        #optionsContainer {
            display: grid;
            gap: 14px;
        }

        .answer-option {
            padding: 16px 18px;
            border: 2px solid #e5e7ef;
            border-radius: 14px;
            background: white;
            text-align: left;
            cursor: pointer;
            transition: .2s;
        }

        .answer-option:hover {
            border-color: #6437ff;
            transform: translateY(-2px);
        }

        .answer-option.selected {
            border-color: #6437ff;
            background: #f0ecff;
            color: #5630dc;
            font-weight: 700;
        }

        .quiz-navigation {
            display: flex;
            justify-content: space-between;
            gap: 15px;
            margin-top: 25px;
        }

        .quiz-navigation button {
            padding: 13px 20px;
            border: 0;
            border-radius: 13px;
            background: #6437ff;
            color: white;
            font-weight: 700;
            cursor: pointer;
        }

        .quiz-navigation button:disabled {
            opacity: .4;
            cursor: not-allowed;
        }

        .result-card {
            max-width: 700px;
            margin: 80px auto;
            padding: 45px 25px;
            text-align: center;
            background: white;
            border-radius: 30px;
            box-shadow:
                0 20px 60px
                rgba(30,40,80,.12);
        }

        .result-icon {
            font-size: 60px;
        }

        .final-score {
            margin-top: 15px;
            font-size: 70px;
            font-weight: 900;
            color: #6437ff;
        }

        .result-stats {
            display: grid;
            grid-template-columns:
                repeat(4, 1fr);
            gap: 12px;
            margin: 30px 0;
        }

        .result-stats div {
            padding: 15px 8px;
            border-radius: 15px;
            background: #f5f6fa;
        }

        .result-stats strong,
        .result-stats span {
            display: block;
        }

        .result-stats strong {
            font-size: 22px;
        }

        .result-stats span {
            color: #737d91;
            font-size: 12px;
        }

        .result-card button {
            margin: 5px;
        }

        @media (max-width: 600px) {

            .quiz-area {
                margin: 25px auto;
                padding: 15px;
            }

            .question-card {
                padding: 22px;
            }

            .question-card h2 {
                font-size: 22px;
            }

            .result-stats {
                grid-template-columns:
                    repeat(2, 1fr);
            }

            .quiz-navigation {
                flex-direction: column;
            }

        }

    `;

    document.head.appendChild(style);
}


// ==========================================
// HOME FUNCTIONS
// ==========================================

function scrollToQuizzes() {

    const section =
        document.getElementById("quizzes");

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }
}


function showLoginMessage() {

    alert(
        "Login will be connected later."
    );

        }
