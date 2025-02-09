# Blood Test Report Interpreter

This project aims to make understanding your blood test report more accessible to the average patient.

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

# Inspiration
Ever received a blood test report and felt lost in the medical jargon?  Wish you truly understood why your doctor recommended those Vitamin D supplements?  We created this blood test report interpreter to empower you to take control of your health.  It translates complex medical data into clear, understandable insights, giving you the knowledge you need to actively participate in your healthcare.

# How We Built It
Our frontend leverages HTML, CSS, and JavaScript.  The JavaScript code makes an API call to our backend, sending the blood test report file.  The backend is a Flask application that uses Celery and Redis to asynchronously queue and process these reports. This approach significantly improves server responsiveness and scalability.  Finally, we deployed the application on Render.

# Next Steps
We have a number of exciting ideas for future development, including:
- Creating a dedicated mobile app.
- Integrating a more specialized, fine-tuned large language model (LLM) for enhanced analysis.
- Expanding support for a wider range of lab reports, file types, and languages.
- Implementing user accounts/patient profiles to securely store past results and enable comparison over time.
