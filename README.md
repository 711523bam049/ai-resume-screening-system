# 🧠 AI Resume Screening System

An **AI-powered Resume Screening System** that automatically analyzes resumes, extracts key information, and evaluates how well a candidate matches a given job description based on skill overlap.

This project demonstrates a **full-stack application** using **FastAPI** for the backend and **React (Vite)** for the frontend, focusing on real-world resume processing and scoring logic.

---

## 🚀 Project Overview

Recruiters often spend significant time manually screening resumes. This project aims to **automate the initial resume screening process** by:

- Uploading resumes in **PDF format**
- Extracting **text, email, and skills** from resumes
- Comparing resume skills with **job-required skills**
- Generating a **resume match score**
- Providing results through a clean **API and frontend interface**

The system is designed to be **fast, modular, and scalable**, making it suitable for real-world HR automation use cases.

---

## ✨ Features

- 📄 Upload resumes in **PDF format**
- 🧠 Automatic **text extraction** from resumes
- 📧 **Email extraction** from resume content
- 🛠️ **Skill extraction** using predefined skill sets
- 📊 **Resume-to-job matching score** calculation
- ⚡ REST API built with **FastAPI**
- 🌐 Frontend built using **React + Vite**
- 📘 Interactive API documentation via **Swagger UI**

---

## 🏗️ Tech Stack

### Backend
- Python
- FastAPI
- Uvicorn
- PDFPlumber
- Regex-based text processing

### Frontend
- React
- Vite
- JavaScript  
- Tailwind CSS *(UI enhancement in progress)*

### Tools & Others
- Git & GitHub
- REST APIs
- Swagger UI

---

## 📂 Project Structure

```text
ai-resume-screening-system/
│
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── resume_parser.py     # Resume text, email & skill extraction logic
│   ├── scorer.py            # Resume-job matching score logic
│   ├── requirements.txt     # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Frontend UI logic
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles
│   ├── package.json         # Frontend dependencies
│
├── sample_resumes/          # Sample resumes for testing
├── .gitignore               # Ignored files & folders
├── README.md                # Project documentation

Sure 👍
Here it is exactly “like a code”, ready to paste into README.md.
Everything is inside one Markdown code block.

⸻

🔗 Match Resume with Job Skills

```http
POST /match-resume/

Compares resume skills with job-required skills and returns a match score.

⸻

▶️ How to Run the Project Locally

1️⃣ Backend Setup

cd backend
python -m venv venv
source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload

Open API docs:

http://127.0.0.1:8000/docs


⸻

2️⃣ Frontend Setup

cd frontend
npm install
npm run dev

Open frontend:

http://localhost:5173


⸻

🧪 How It Works (Flow)
	1.	User uploads a resume (PDF)
	2.	Backend extracts text and identifies skills
	3.	User provides required job skills
	4.	System compares resume skills with job skills
	5.	A resume match percentage is calculated
	6.	Results are returned via API and frontend

⸻

🔮 Future Improvements
	•	Advanced NLP-based skill extraction
	•	Resume ranking across multiple candidates
	•	Authentication for recruiters
	•	Resume parsing for multiple formats (DOCX)
	•	Improved UI/UX with Tailwind CSS
	•	Deployment on cloud platforms

⸻

👨‍💻 Author

Sathya T
AI & Full-Stack Development Enthusiast

⸻

⭐ Why This Project Matters

This project showcases:
	•	Backend API design
	•	Resume parsing logic
	•	Frontend-backend integration
	•	Real-world automation use case
	•	Clean project structuring
