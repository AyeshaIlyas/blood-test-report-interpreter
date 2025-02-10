const chooseFileBtn = document.getElementById("pdfFile");
const dropArea = document.getElementById("drop-area");
const interpretBtn = document.getElementById("interpret");
const resultsDiv = document.getElementById("results");
const fileNameSpan = document.getElementById("fileName");

const loader = interpretBtn.querySelector(".loader");
const buttonText = interpretBtn.querySelector(".button-text");

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
  interpretBtn.classList.remove("loading"); // Remove loading class
  loader.style.display = "none"; // Hide loader
  buttonText.style.display = "inline"; // Show button text
}

async function pollResults(taskId) {
  let attempts = 0;
  const maxAttempts = 24; // 2-minute timeout

  const intervalId = setInterval(async () => {
    try {
      const resultsResponse = await fetch(
        `/results/${taskId}`
      );

      if (!resultsResponse.ok) {
        throw new Error(`Server error: ${resultsResponse.status}`);
      }

      const resultsData = await resultsResponse.json();
      if (resultsData.result) {
        clearInterval(intervalId);
        displayResults(resultsData.result);
        resetUI();
      } else if (resultsData.error) {
        clearInterval(intervalId);
        displayError("Hmm...we could not process your report");
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
      resetUI();
    }
  }, 5000);
}

async function interpretReport() {
  interpretBtn.disabled = true;
  interpretBtn.classList.add("loading"); // Add loading class
  loader.style.display = "block"; // Show loader
  buttonText.style.display = "none"; // Hide button text

  const file = chooseFileBtn.files[0];

  if (!file) {
    displayError("Please choose a file");
    resetUI();
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const url = "/interpret";

  try {
    const response = await fetch(url, { method: "POST", body: formData });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const taskInfo = await response.json();

    if (taskInfo.task_id) {
      pollResults(taskInfo.task_id);
    } else {
      throw new Error("No task_id received");
    }
  } catch (error) {
    displayError("Hmm...we could not process your report");
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
    interpretBtn.style.display = "flex";
  }
});

chooseFileBtn.addEventListener("change", (event) => {
  updateFileNameDisplay();
  if (event.target.files.length > 0) {
    interpretBtn.style.display = "flex";
  } else {
    interpretBtn.style.display = "none";
  }
});

interpretBtn.addEventListener("click", (e) => {
  e.preventDefault();
  interpretReport();
});
