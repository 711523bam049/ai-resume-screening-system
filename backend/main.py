from fastapi import FastAPI, UploadFile, File
import shutil
from backend.resume_parser import extract_text, extract_email, extract_skills

app = FastAPI(title="AI Resume Screening System")

@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):
    temp_file = f"temp_{file.filename}"

    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(temp_file)
    email = extract_email(text)
    skills = extract_skills(text)

    return {
        "email": email,
        "skills_found": skills,
        "total_skills": len(skills)
    }