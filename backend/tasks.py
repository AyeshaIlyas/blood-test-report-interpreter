from backend.celery_app import celery  # Import the Celery app instance
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

# get gemini model
gemini_key = os.getenv("GEMINI_KEY")
genai.configure(api_key=gemini_key)
model = genai.GenerativeModel("gemini-pro")


@celery.task 
def interpret_report(pages):
    prompt = "Can you interpret this page of a blood test report and give practical lifestyle advice? Keep answers concise and friendly. You must format your response in HTML using space, paragraphs, headings."
    try:
        interpretations = []
        for page in pages:
            response = model.generate_content(prompt + "\n\n" + page + "\nExplanation: ")
            interpretations.append(response.text)
        result = "\n\n".join(interpretations)
        return {"result": result}
    except Exception as e:
        return {"error": "could not interpret report..."}