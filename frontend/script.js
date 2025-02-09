const chooseFileBtn = document.getElementById("pdfFile");
const dropArea = document.getElementById("drop-area");
const interpretBtn = document.getElementById("interpret");
const resultsDiv = document.getElementById("results");
const fileNameSpan = document.getElementById("fileName");

function displayResults(data) {
  resultsDiv.innerHTML = ""; 
  const resultItem = document.createElement("div");
  resultItem.innerHTML = data;
  resultsDiv.appendChild(resultItem);
}

function displayError(message) {
  resultsDiv.innerHTML = "";
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error-message");
  errorDiv.innerHTML = message;
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

function resetUI() {
  interpretBtn.disabled = false;
  interpretBtn.textContent = "Interpret";
}

async function pollResults(taskId) {
  let attempts = 0;
  const maxAttempts = 24; // 2-minute timeout

  console.log(`Polling started for Task ID: ${taskId}`);

  const intervalId = setInterval(async () => {
    console.log(`Polling attempt ${attempts + 1} for task: ${taskId}`);

    try {
      const resultsResponse = await fetch(`http://127.0.0.1:5000/results/${taskId}`);
      
      if (!resultsResponse.ok) {
        throw new Error(`Server error: ${resultsResponse.status}`);
      }

      const resultsData = await resultsResponse.json();
      console.log("Received from server:", resultsData);

      if (resultsData.result) {
        clearInterval(intervalId);
        displayResults(resultsData.result);
        resetUI();
      } else if (resultsData.error) {
        clearInterval(intervalId);
        displayError(resultsData.error);
        resetUI();
      }

      if (++attempts >= maxAttempts) {
        clearInterval(intervalId);
        displayError("Timed out while waiting for results.");
        resetUI();
      }
    } catch (error) {
      clearInterval(intervalId);
      displayError("Error fetching results: " + error.message);
      console.error("Error details:", error);
      resetUI();
    }
  }, 5000);
}

async function interpretReport() {
  console.log("Interpreting...");
  interpretBtn.disabled = true; 
  interpretBtn.textContent = "Processing...";

  const file = chooseFileBtn.files[0];

  if (!file) {
    displayError("Please choose a file");
    resetUI();
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const url = "http://127.0.0.1:5000/interpret";

  try {
    const response = await fetch(url, { method: "POST", body: formData });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const taskInfo = await response.json();
    console.log("Task Info Received:", taskInfo);

    if (taskInfo.task_id) {
      console.log("Starting polling for task:", taskInfo.task_id);
      pollResults(taskInfo.task_id);
    } else {
      throw new Error("No task_id received");
    }
  } catch (error) {
    console.error("Overall error:", error);
    displayError(error.message);
    resetUI();
  }
}

interpretBtn.style.display = "none";

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("highlight");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("highlight");
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("highlight");

  chooseFileBtn.files = event.dataTransfer.files;
  updateFileNameDisplay();

  if (chooseFileBtn.files.length > 0) {
    console.log("File dropped:", chooseFileBtn.files[0].name);
    interpretBtn.style.display = "flex";
  }
});

chooseFileBtn.addEventListener("change", (event) => {
  updateFileNameDisplay();
  if (event.target.files.length > 0) {
    console.log("File selected (click):", event.target.files[0].name);
    interpretBtn.style.display = "flex";
  } else {
    interpretBtn.style.display = "none";
  }
});

interpretBtn.addEventListener("click", e => {
  e.preventDefault();
  interpretReport();
});
