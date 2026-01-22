import pdfplumber
import re

SKILLS = [
    "Python", "Machine Learning", "NLP",
    "FastAPI", "Docker", "AWS", "SQL"
]

def extract_text(pdf_path: str) -> str:
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text.lower()

def extract_email(text: str):
    match = re.search(
        r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}",
        text
    )
    return match.group() if match else "Not Found"

def extract_skills(text: str):
    found_skills = []
    for skill in SKILLS:
        if skill.lower() in text:
            found_skills.append(skill)
    return found_skills