from fastapi import FastAPI, UploadFile, File, Body
import shutil
import os

from backend.resume_parser import extract_text, extract_email, extract_skills
from backend.scorer import calculate_score

app = FastAPI(title="AI Resume Screening System")

# -------------------------------------------------
# Root endpoint (Health check / Homepage)
# -------------------------------------------------
@app.get("/")
def root():
    return {
        "message": "AI Resume Screening System is running",
        "status": "OK",
        "docs": "http://127.0.0.1:8000/docs"
    }

# -------------------------------------------------
# Basic resume upload + scoring (static job skills)
# -------------------------------------------------
JOB_SKILLS = ["Python", "FastAPI", "SQL", "Docker"]

@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):
    temp_file = f"temp_{file.filename}"

    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(temp_file)
    email = extract_email(text)
    skills = extract_skills(text)

    score = calculate_score(skills, JOB_SKILLS)

    if os.path.exists(temp_file):
        os.remove(temp_file)

    return {
        "email": email,
        "skills_found": skills,
        "resume_score": score
    }

# -------------------------------------------------
# NEW: Dynamic resume & job matching endpoint
# -------------------------------------------------
@app.post("/match-resume/")
async def match_resume(
    file: UploadFile = File(...),
    job_skills: list[str] = Body(...)
):
    temp_file = f"temp_{file.filename}"

    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(temp_file)
    email = extract_email(text)
    resume_skills = extract_skills(text)

    score = calculate_score(resume_skills, job_skills)

    if os.path.exists(temp_file):
        os.remove(temp_file)

    return {
        "email": email,
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "resume_score": score
    }uvicorn backend.main:app --reload