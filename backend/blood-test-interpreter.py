from dotenv import load_dotenv
import os
import pdfplumber
import google.generativeai as genai

load_dotenv()

gemini_key = os.getenv("GEMINI_KEY")
genai.configure(api_key=gemini_key)
model = genai.GenerativeModel("gemini-pro")

def get_text(file_name):
    with pdfplumber.open(file_name) as pdf:
        pages = []
        for page in pdf.pages:
            pages.append(page.extract_text())
        return pages
    
def interpret_report(pages):
    prompt = "Can you intepret this page of a blood test report and give practical lifestyle advice"
    interpretations = []
    for page in pages:
        response = model.generate_content(prompt + ":\n" + page)
        interpretations.append(response.text)
    return interpretations

pages = get_text("sample-data/sample-report.pdf")
interpretations = interpret_report(pages)

with open("results.txt", "w") as file:
    file.write("\n".join(interpretations))
