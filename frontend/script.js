document.addEventListener('DOMContentLoaded', () => {
    let selectedFile; // Store the selected file

    function interpretFile() {
        if (!selectedFile) {
            console.log("No file selected.");
            return; // Don't proceed if no file is selected
        }

        console.log("Interpreting the PDF:", selectedFile.name);
        // ... (Your PDF interpretation logic here) ...
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