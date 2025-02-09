const chooseFileBtn = document.getElementById('pdfFile');
const dropArea = document.getElementById('drop-area');
const interpretBtn = document.getElementById('interpret');
const resultsDiv = document.getElementById('results');
const fileNameSpan = document.getElementById('fileName'); 

async function interpretFile() {
  const file = chooseFileBtn.files[0];
  
  if (!file) {
    displayError("Please choose a file");
    return; // Don't proceed if no file is selected
  }

  const formData = new FormData();
  formData.append('file', file);

  const url = "http://127.0.0.1:5000/interpret";

  try {
    const response = await fetch(url, {
      method: "POST", 
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.text();
    console.log(data);
    displayResults(data);

  } catch (error) {
    console.log("Error:", error)
    displayError(error.message);
  }

}

function displayResults(data) {
  resultsDiv.innerHTML = ''; // Clear previous results
  const resultItem = document.createElement('div');
  resultItem.textContent = data;
  resultsDiv.appendChild(resultItem);
  
}

function displayError(message) {
  const resultsDiv = document.getElementById('results');
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error-message');
  errorDiv.textContent = message;
  resultsDiv.innerHTML = ''; // Clear previous results
  resultsDiv.appendChild(errorDiv);
}

function updateFileNameDisplay() {
  const file = chooseFileBtn.files[0];
  if (file) {
    fileNameSpan.textContent = file.name;
  } else {
    fileNameSpan.textContent = ""; //Clear if no file
  }
}

interpretBtn.style.display = 'none';

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

    chooseFileBtn.files = event.dataTransfer.files;
    updateFileNameDisplay();

    if (chooseFileBtn.files.length > 0) {
      console.log("File dropped:", chooseFileBtn.files[0].name);
      interpretBtn.style.display = 'flex';
    }
});

chooseFileBtn.addEventListener('change', (event) => {
  updateFileNameDisplay();
  if (event.target.files.length > 0) {
    console.log("File selected (click):", event.target.files[0].name);
    interpretBtn.style.display = 'flex';
  } else {
    interpretBtn.style.display = 'none';
  }
});

interpretBtn.addEventListener('click', interpretFile);