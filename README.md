# AI Resume Screening System

An AI-ready backend system built with **FastAPI** that automatically analyzes resumes (PDF format), extracts key information, and matches resumes against job requirements to generate a suitability score.

This project simulates the core functionality of an **Applicant Tracking System (ATS)**.

---

## 🚀 Features

- Resume upload in PDF format
- Email extraction from resumes
- Technical skill extraction
- Resume scoring based on job requirements
- Dynamic job skill matching
- REST API with Swagger documentation
- Clean and modular backend architecture

---

## 🛠 Tech Stack

- Python 3
- FastAPI
- Uvicorn
- PDFPlumber

---

## 📂 Project Structure

ai-resume-screening-system/
│
├── backend/
│   ├── __init__.py              # Marks backend as a Python package
│   ├── main.py                  # FastAPI application & API routes
│   ├── resume_parser.py         # Resume PDF parsing & skill extraction
│   ├── scorer.py                # Resume–job matching & scoring logic
│   └── requirements.txt         # Backend dependencies
│
├── sample_resumes/
│   └── .gitkeep                 # Keeps folder tracked (no real resumes)
│
├── .gitignore                   # Git ignore rules
├── README.md                    # Project documentation
└── venv/                        # Virtual environment (ignored in Git)

## 📈 Learning Outcomes

- Built REST APIs using FastAPI
- Worked with file uploads and PDF parsing
- Implemented resume–job matching logic
- Practiced clean Git and project structuring
- Designed an ATS-style backend system