document.addEventListener('DOMContentLoaded', () => {
    function interpretFile() {
        const fileInput = document.getElementById('pdfFile');
        const file = fileInput.files[0];
        if (!file) {
           alert("No file selected.");
        return; // Don't proceed if no file is selected
        }

        console.log("Interpreting the PDF:", selectedFile.name);
        // ... (Your PDF interpretation logic here) ...
        const formData = new FormData();
        formData.append('pdfFile', file); // 'pdfFile' should match your backend's expected name

        fetch('http://127.0.0.1:5000/interpret', { // Replace '/interpret' with your backend endpoint
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => {throw new Error(err.message || response.statusText)}); // Extract error message from JSON if available
          }
          return response.json(); // Or response.text() if your backend returns plain text
        })
        .then(data => {
          // Process the interpreted data from the backend
          displayResults(data); // Function to display results
        })
        .catch(error => {
          console.error('Error:', error);
          displayError(error.message); // Display error message to the user
        });
    }

    function displayResults(data) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Clear previous results
    
        if (typeof data === 'object') {
            for (const key in data) {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
    
                const label = document.createElement('span');
                label.classList.add('result-label');
                label.textContent = `${key}: `;
                resultItem.appendChild(label);
    
                const value = document.createElement('span');
                value.textContent = data[key];
                resultItem.appendChild(value);
    
                resultsDiv.appendChild(resultItem);
            }
        } else {
            const resultItem = document.createElement('div');
            resultItem.textContent = data;
            resultsDiv.appendChild(resultItem);
        }
    }
    
    
    function displayError(message) {
      const resultsDiv = document.getElementById('results');
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('error-message');
      errorDiv.textContent = message;
      resultsDiv.innerHTML = ''; // Clear previous results
      resultsDiv.appendChild(errorDiv);
    }

    document.getElementById('interpret').style.display = 'none';

    const dropArea = document.getElementById('drop-area');

    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropArea.classList.add('highlight');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('highlight');
    });

    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dropArea.classList.remove('highlight');

        selectedFile = event.dataTransfer.files[0]; // Store the dropped file
        const fileInput = document.getElementById('pdfFile');
        fileInput.files = event.dataTransfer.files;

        console.log("File dropped:", selectedFile.name);
        document.getElementById('interpret').style.display = 'flex';
    });

    document.getElementById('pdfFile').addEventListener('change', (event) => {
        selectedFile = event.target.files[0]; // Store the selected file
        if (selectedFile) {
            console.log("File selected (click):", selectedFile.name);
            document.getElementById('interpret').style.display = 'flex';
        } else {
            console.log("No file selected (click).");
            document.getElementById('interpret').style.display = 'none'; // Hide if no file is selected
        }
    });

    document.getElementById('interpret').addEventListener('click', interpretFile);
});