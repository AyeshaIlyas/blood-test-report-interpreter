document.addEventListener('DOMContentLoaded', () => {
    function uploadFile() {
        const fileInput = document.getElementById('pdfFile');
        const file = fileInput.files[0];

        if (file) {
            console.log("File selected (click):", file.name); // Added (click)
            document.getElementById('interpret').style.display = 'flex';
        } else {
            console.log("No file selected (click)."); // Added (click)
        }
    }

    function interpretFile() {
        console.log("Interpreting the PDF...");
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

        const file = event.dataTransfer.files[0];
        const fileInput = document.getElementById('pdfFile');
        fileInput.files = event.dataTransfer.files;

        console.log("File dropped:", file.name);
        document.getElementById('interpret').style.display = 'flex';
    });

    document.getElementById('pdfFile').addEventListener('change', uploadFile);

    document.getElementById('interpret').addEventListener('click', interpretFile);
});