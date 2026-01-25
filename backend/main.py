from fastapi import FastAPI, UploadFile, File, Form
from pydantic import Json
import shutil
import os

from backend.resume_parser import extract_text, extract_email, extract_skills, extract_name, extract_phone, extract_education, extract_coding_profiles, extract_projects, extract_publications
from backend.scorer import calculate_score
import logging
import json

logging.basicConfig(level=logging.INFO, filename='backend_debug.log', filemode='w', format='%(asctime)s - %(levelname)s - %(message)s')

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Resume Screening System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    score_data = calculate_score(skills, JOB_SKILLS)

    if os.path.exists(temp_file):
        os.remove(temp_file)

    return {
        "email": email,
        "skills_found": skills,
        "resume_score": score_data["score"],
        "missing_skills": score_data["missing_skills"]
    }

# -------------------------------------------------
# NEW: Dynamic resume & job matching endpoint
# -------------------------------------------------
@app.post("/match-resume/")
async def match_resume(
    file: UploadFile = File(...),
    job_skills_str: str = Form(..., alias="job_skills")
):
    try:
        job_skills = json.loads(job_skills_str)
        # Handle case where it might be double stringified or something
        if isinstance(job_skills, str):
             job_skills = json.loads(job_skills)
    except json.JSONDecodeError:
        # Fallback to comma separation
        job_skills = [s.strip() for s in job_skills_str.split(",") if s.strip()]
    
    logging.info(f"Parsed job_skills: {job_skills} (Type: {type(job_skills)})")
    temp_file = f"temp_{file.filename}"

    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(temp_file)
    logging.info(f"Extracted text length: {len(text)}")
    logging.info(f"Extracted text preview: {text[:200]}")
    
    if len(text.strip()) < 5:
        return {
            "name": "Error: Scanned/Empty PDF",
            "email": "Text extraction failed",
            "phone": "Try a different file",
            "education_level": [],
            "resume_skills": [],
            "missing_skills": job_skills,
            "coding_profiles": [],
            "projects": "Could not extract text from this PDF. It might be an image scan without OCR.",
            "publications": "",
            "job_skills": job_skills,
            "resume_score": 0
        }

    # Extract details
    name = extract_name(text)
    email = extract_email(text)
    phone = extract_phone(text)
    education = extract_education(text)
    
    # Pass job_skills to extract_skills for dynamic matching (Fix for bug)
    resume_skills = extract_skills(text, additional_skills=job_skills)
    
    # Extended Details (Phase 4)
    # coding_profiles is now a list of dicts: [{'platform': '...', 'url': '...', 'details': '...'}, ...]
    coding_profiles = extract_coding_profiles(text)
    projects = extract_projects(text)
    publications = extract_publications(text)

    # Calculate score
    score_data = calculate_score(resume_skills, job_skills)

    if os.path.exists(temp_file):
        os.remove(temp_file)

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "education_level": education,
        "resume_skills": resume_skills,
        "missing_skills": score_data["missing_skills"],
        "coding_profiles": coding_profiles,
        "projects": projects,
        "publications": publications,
        "job_skills": job_skills,
        "resume_score": score_data["score"]
    }