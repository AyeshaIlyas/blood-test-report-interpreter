# Blood Test Report Interpreter

This project aims to make understanding your blood test report more accessible to the average patient.

Note: This project is not intending to provide any medical advice, nor should this replace the consultation of an actual medical professional.
(This project should not be used for clinical purposes, as a subsitute for professional medical advice, or in any manner that is overseen by or requires clearance or approval from any applicable regulatory authority.)

**Disclaimer:** This project is for informational purposes only and **does not provide medical advice**. It should not be used as a substitute for consulting with a qualified medical professional.  This project should not be used for clinical purposes, as a substitute for professional medical advice, or in any manner that is overseen by or requires clearance or approval from any applicable regulatory authority.  Always consult with your doctor or other healthcare provider for any questions you may have regarding your health or a medical condition.

## Getting Started
To run this project locally, follow these steps:
1. **Prerequisites:** Ensure you have Python installed on your device.  It's recommended to use the latest stable version.
2. **Clone the Repository:**
```git clone [https://github.com/AyeshaIlyas/blood-test-report-interpreter.git](https://github.com/AyeshaIlyas/blood-test-report-interpreter.git)```
3. **Navigate to the Backend Directory:**
```cd blood-test-report-interpreter/backend```
4. **Create and Activate a Virtual Environment (Recommended):**
   - ```python3 -m venv .venv``` - Create the virtual environment
   - ```source .venv/bin/activate```  - Activate the virtual environment (Linux/macOS)
   - ```.venv\Scripts\activate```  - Activate the virtual environment (Windows)
5. **Install Dependencies:**
```pip3 install -r requirements.txt```
6. **Run the Flask App:**
```flash run```
7. **Access the Application:** Open the ```index.html``` file in your web browser. This is usually http://127.0.0.1:5000/.
8. **Load and Interpret Reports:** You can now load your blood test reports and use the application to explore and interpret your results.

## TODO
- add loading icon while waiting for results from backend
- condense initial output results from Gemini
- improve output readability (change model to gpt?)