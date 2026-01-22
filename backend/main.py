from fastapi import FastAPI, UploadFile, File
import shutil
import os

from backend.resume_parser import extract_text, extract_email, extract_skills
from backend.scorer import calculate_score

app = FastAPI(title="AI Resume Screening System")

# Sample job skills (can be replaced with dynamic input later)
JOB_SKILLS = ["Python", "FastAPI", "SQL", "Docker"]

# -----------------------------
# Root endpoint (Homepage)
# -----------------------------
@app.get("/")
def root():
    return {
        "message": "AI Resume Screening System is running",
        "status": "OK",
        "docs": "http://127.0.0.1:8000/docs"
    }

# -----------------------------
# Resume upload endpoint
# -----------------------------
@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):
    temp_file = f"temp_{file.filename}"

    # Save uploaded file temporarily
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract information
    text = extract_text(temp_file)
    email = extract_email(text)
    skills = extract_skills(text)

    # Calculate resume score
    score = calculate_score(skills, JOB_SKILLS)

    # Clean up temp file
    if os.path.exists(temp_file):
        os.remove(temp_file)

    return {
        "email": email,
        "skills_found": skills,
        "resume_score": score
    }