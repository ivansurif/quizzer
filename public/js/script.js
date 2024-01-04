// Store the initial default value when the page loads
const defaultProjectName = document.getElementById('projectName').value;
const defaultModuleName = document.getElementById('moduleName').value;


document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var data = {
        dataField: document.getElementById('dataField').value
    };

    fetch('/add-questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) { // Check if response status is 200
            return response.json();
        } else {
            return response.json().then(errData => {
                throw new Error(errData.message || 'Request failed');
    })
}})
    .then(data => {
        console.log('Success:', data);
        document.getElementById('dataField').value = '';
        // Display the response message
        displayMessage(data.message);

    })
    .catch((error) => {
        console.error('Error:', error);
        // Display the error message
        displayMessage(error.message);

    });
});


function displayMessage(message, details) {
    const detailsString = JSON.stringify(details, null, 2); // Converts object to formatted string
    alert(`${message}\nDetails: ${detailsString}`);
}


document.getElementById('manualForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the default form submission action

    const projectName = document.getElementById('projectName').value;
    const moduleName = document.getElementById('moduleName').value;
    const questionType = document.getElementById('questionType').value;
    const questionContext = document.getElementById('questionContext').value;
    const questionText = document.getElementById('questionText').value;
    const answerItem1 = document.getElementById('answerItem1').value;
    const answerItem2 = document.getElementById('answerItem2').value;
    const questionTitle = document.getElementById('questionTitle').value;
    


    const formData = {
        projectName: projectName,
        moduleName: moduleName,
        question:
            { title: questionTitle, type: questionType, questionContext, questionText },
        answers: [
            {answerItem1: answerItem1, answerItem1IsCorrect: document.getElementById('answerItem1IsCorrect').checked },
            {answerItem2: answerItem2, answerItem2IsCorrect: document.getElementById('answerItem2IsCorrect').checked },
            {answerItem3: document.getElementById('answerItem3').value, answerItem3IsCorrect: document.getElementById('answerItem3IsCorrect').checked },
            {answerItem4: document.getElementById('answerItem4').value, answerItem4IsCorrect: document.getElementById('answerItem4IsCorrect').checked },
            {answerItem5: document.getElementById('answerItem5').value, answerItem5IsCorrect: document.getElementById('answerItem5IsCorrect').checked },
            {answerItem5: document.getElementById('answerItem6').value, answerItem6IsCorrect: document.getElementById('answerItem6IsCorrect').checked },
            {answerItem5: document.getElementById('answerItem7').value, answerItem7IsCorrect: document.getElementById('answerItem7IsCorrect').checked },
            {answerItem5: document.getElementById('answerItem8').value, answerItem8IsCorrect: document.getElementById('answerItem8IsCorrect').checked }

        ]
    };

    if (!projectName || !moduleName || !questionTitle || !questionType || !questionContext || !questionText || !answerItem1 ) {
        alert('Please fill in all the required fields.');
        return; // Stop the function if any required field is empty
    }

    // Check if at least one checkbox is checked
    const isAnyCheckboxChecked = document.getElementById('answerItem1IsCorrect').checked ||
                                 document.getElementById('answerItem2IsCorrect').checked ||
                                 document.getElementById('answerItem3IsCorrect').checked ||
                                 document.getElementById('answerItem4IsCorrect').checked ||
                                 document.getElementById('answerItem5IsCorrect').checked ||
                                 document.getElementById('answerItem6IsCorrect').checked ||
                                 document.getElementById('answerItem7IsCorrect').checked ||
                                 document.getElementById('answerItem8IsCorrect').checked;
;

    if (!isAnyCheckboxChecked) {
        alert('Please select at least one correct answer.');
        return; // Stop the function if no checkbox is checked
    }

    // Making a POST request to the API endpoint with the form data
    fetch('/add-questions-manual', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        console.log(response); // Log the raw response
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Server responded with a non-200 status code');
        }
    })
    .then(data => {
        console.log('Success:', data);
        // Clear the form fields if the server response is OK
        // document.getElementById('projectName').value = defaultProjectName;
        document.getElementById('questionTitle').value = '';
        document.getElementById('questionType').value = '';
        document.getElementById('questionContext').value = '';
        document.getElementById('questionText').value = '';
        document.getElementById('answerItem1').value = '';
        document.getElementById('answerItem2').value = '';
        document.getElementById('answerItem3').value = '';
        document.getElementById('answerItem4').value = '';
        document.getElementById('answerItem5').value = '';
        document.getElementById('answerItem1IsCorrect').checked = false;
        document.getElementById('answerItem2IsCorrect').checked = false;
        document.getElementById('answerItem3IsCorrect').checked = false;
        document.getElementById('answerItem4IsCorrect').checked = false;
        document.getElementById('answerItem5IsCorrect').checked = false;
        document.getElementById('answerItem6IsCorrect').checked = false;
        document.getElementById('answerItem7IsCorrect').checked = false;
        document.getElementById('answerItem8IsCorrect').checked = false;
        displayMessage(data.message, data.details);
    })
    .catch((error) => {
        console.error('Error:', error);
        displayMessage('An error occurred: ' + error.message);

    });
});
