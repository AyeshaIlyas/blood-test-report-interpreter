from celery_app import celery  # Import the Celery app instance
import google.generativeai as genai
import os

# get gemini model
gemini_key = os.getenv("GEMINI_KEY")
genai.configure(api_key=gemini_key)
model = genai.GenerativeModel("gemini-pro")

@celery.task 
def interpret_report(pages):
    prompt = "Can you interpret this page of a blood test report and give practical lifestyle advice? Pretty format results returning valid HTML."
    try:
        interpretations = []
        for page in pages:
            response = model.generate_content(prompt + "\n\n" + page + "\nExplanation: ")
            interpretations.append(response.text)
        result = "\n\n".join(interpretations)
        return {"result": result}
    except Exception as e:
        return {"error": "could not interpret report..."}
