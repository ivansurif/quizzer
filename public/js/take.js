document.addEventListener('DOMContentLoaded', function() {
    // Function to load a question from the backend
    async function loadQuestion() {
        try {
            const response = await fetch('/getQuestion');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const questionData = await response.json();

            // Set the question text
            document.querySelector('.card-title').textContent = questionData.details.question.questionText;

            // Clear previous options
            const optionsContainer = document.getElementById('options-container');
            optionsContainer.innerHTML = '';

            // Add new options
            questionData.details.answers.forEach((answer, index) => {
                let optionText = answer[`answerItem${index + 1}`];
                if (optionText) {
                    let btn = document.createElement('button');
                    btn.classList.add('btn', 'btn-outline-secondary', 'btn-block', 'mx-2', 'my-2');
                    btn.textContent = optionText;
                    // Store correct/incorrect value for later use (e.g., validation)
                    btn.dataset.isCorrect = answer[`answerItem${index + 1}IsCorrect`];
                    console.log(optionText, answer[`answerItem${index + 1}IsCorrect`]);
                    // Add click event listener to toggle selection
                    btn.addEventListener('click', () => toggleOptionSelection(btn));

                    optionsContainer.appendChild(btn);
                }
            });

        } catch (e) {
            console.error('Error fetching question:', e);
        }
    }

    // Function to toggle option selection
    function toggleOptionSelection(btn) {
        btn.classList.toggle('btn-light');
        btn.classList.toggle('btn-outline-secondary');
        btn.classList.toggle('selected');

    }

    // Function to evaluate the answers
    function evaluateAnswers() {
        const options = document.querySelectorAll('#options-container button');
        options.forEach(btn => {
            const isSelected = btn.classList.contains('selected');
            const isCorrect = btn.dataset.isCorrect === 'true';

            // Remove selection class and any existing Bootstrap classes related to option selection
            btn.classList.remove('selected', 'btn-outline-secondary', 'btn-light');

            // Correctly handled options
            if ((isSelected && isCorrect) || (!isSelected && !isCorrect)) {
                btn.classList.add('btn-success');
            } else { // Incorrectly handled options
                btn.classList.add('btn-danger');
            }
        });
        // Additional logic if needed, e.g., displaying a score or feedback
    }

    // Load initial question
    loadQuestion();

    // Event listener for 'Next' button
    document.getElementById('next-btn').addEventListener('click', function() {
        loadQuestion();
        // Reset or handle previous question's submission if needed
    });

    // Add event listener to 'Submit' button
    document.getElementById('submit-btn').addEventListener('click', function() {
        evaluateAnswers();
        // Disable buttons or handle UI changes after submission if needed
    });
});




// document.addEventListener('DOMContentLoaded', function() {
//     // Function to load a question from the backend
//     async function loadQuestion() {
//         try {
//             const response = await fetch('/getQuestion');
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const questionData = await response.json();

//             // Set the question text
//             document.querySelector('.card-title').textContent = questionData.details.question.questionText;

//             // Clear previous options
//             const optionsContainer = document.getElementById('options-container');
//             optionsContainer.innerHTML = '';

//             // Add new options
//             questionData.details.answers.forEach((answer, index) => {
//                 let optionText = answer[`answerItem${index + 1}`];
//                 if (optionText) {
//                     let btn = document.createElement('button');
//                     btn.classList.add('btn', 'btn-outline-secondary', 'btn-block', 'mx-2');
//                     btn.textContent = optionText;
//                     // Store correct/incorrect value for later use (e.g., validation)
//                     btn.dataset.isCorrect = answer[`answerItem${index + 1}IsCorrect`];
//                     optionsContainer.appendChild(btn);
//                 }
//             });

//         } catch (e) {
//             console.error('Error fetching question:', e);
//         }
//     }

//     // Load initial question
//     loadQuestion();

//     // Event listener for 'Next' button
//     document.getElementById('next-btn').addEventListener('click', function() {
//         loadQuestion();
//         // Reset or handle previous question's submission if needed
//     });

//     // Add functionality for 'Submit' button as needed
// });
