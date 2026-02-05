document.addEventListener('DOMContentLoaded', () => {
    // Screens
    const welcomeScreen = document.getElementById('welcome-screen');
    const questionsScreen = document.getElementById('questions-screen');
    const finalScreen = document.getElementById('final-screen');
    const surpriseScreen = document.getElementById('surprise-screen');

    // Questions Data
    const questions = [
        "What is your favorite color? 🎨",
        "What is a dream you want to achieve this year? 🌟",
        "What makes you smile the most? 😊"
    ];
    let currentQuestionIndex = 0;

    // Elements
    const startBtn = document.getElementById('start-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const questionText = document.getElementById('question-text');
    const answerInput = document.getElementById('answer-input');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // 1. Welcome -> Questions
    startBtn.addEventListener('click', () => {
        switchScreen(welcomeScreen, questionsScreen);
        showQuestion();
    });

    // 2. Handle Questions
    function showQuestion() {
        questionText.textContent = questions[currentQuestionIndex];
        answerInput.value = '';
        answerInput.focus();
    }

    nextQuestionBtn.addEventListener('click', () => {
        handleNextQuestion();
    });

    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleNextQuestion();
    });

    function handleNextQuestion() {
        const answer = answerInput.value.trim();
        if (answer === '') {
            shakeInput(); // Optional: alert user
            return;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            // Fade out/in effect for text could go here
            showQuestion();
        } else {
            switchScreen(questionsScreen, finalScreen);
        }
    }

    function shakeInput() {
        answerInput.style.borderColor = 'red';
        setTimeout(() => answerInput.style.borderColor = '#eee', 500);
    }

    // 3. Final Question -> Surprise
    yesBtn.addEventListener('click', () => {
        switchScreen(finalScreen, surpriseScreen);
        startSurprise();
    });

    noBtn.addEventListener('click', () => {
        // Playful fallback
        const originalText = noBtn.textContent;
        noBtn.textContent = "Try YES! 😉";
        setTimeout(() => noBtn.textContent = originalText, 1500);
    });

    // Helper: Switch Screens
    function switchScreen(from, to) {
        from.classList.remove('active');
        setTimeout(() => {
            to.classList.add('active');
        }, 100); 
    }

    // 4. Surprise Logic
    function startSurprise() {
        startConfetti();
        startSlideshow();
    }

    // Slideshow
    function startSlideshow() {
        const slides = document.querySelectorAll('.slide');
        let slideIndex = 0;

        setInterval(() => {
            slides[slideIndex].classList.remove('active');
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].classList.add('active');
        }, 3000); // Change every 3 seconds
    }

    // Confetti Effect (Simple Canvas Implementation)
    function startConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pieces = [];
        const numberOfPieces = 200;
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];

        function newPiece() {
            return {
                x: Math.random() * canvas.width,
                y: -10,
                d: Math.random() * 10 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 + 2
            };
        }

        for (let i = 0; i < numberOfPieces; i++) {
            pieces.push(newPiece());
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < pieces.length; i++) {
                const p = pieces[i];
                ctx.beginPath();
                ctx.fillStyle = p.color;
                ctx.arc(p.x, p.y, p.d / 2, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                // Reset piece if it goes off screen
                if (p.y > canvas.height) {
                    pieces[i] = newPiece();
                }
            }
            requestAnimationFrame(draw);
        }

        draw();

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
});
