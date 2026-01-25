import pdfplumber
import pypdfium2 as pdfium
import re

SKILLS = [
    "Python", "Machine Learning", "NLP",
    "FastAPI", "Docker", "AWS", "SQL"
]

def extract_text(pdf_path: str) -> str:
    text = ""
    # Try pdfplumber first
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
    except Exception as e:
        print(f"pdfplumber error: {e}")

    # Fallback to pypdfium2 if text is insufficient
    if len(text.strip()) < 10:
        try:
            pdf = pdfium.PdfDocument(pdf_path)
            text_pypdfium = ""
            for i in range(len(pdf)):
                page = pdf[i]
                textpage = page.get_textpage()
                text_pypdfium += textpage.get_text_bounded() + "\n"
            
            # If pypdfium2 extracted more text, use it
            if len(text_pypdfium.strip()) > len(text.strip()):
                text = text_pypdfium
        except Exception as e:
            print(f"pypdfium2 error: {e}")

    return text

def extract_email(text: str):
    match = re.search(
        r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}",
        text
    )
    return match.group() if match else "Not Found"

def extract_skills(text: str, additional_skills: list[str] = None):
    found_skills = []
    
    # Combine hardcoded skills with dynamically provided job skills
    target_skills = set(SKILLS)
    if additional_skills:
        target_skills.update(additional_skills)
        
    for skill in target_skills:
        # regex boundary check for better accuracy (prevents "Java" matching "JavaScript")
        # Use re.IGNORECASE to match "python" in "Python" w/o forcing text.lower()
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text, re.IGNORECASE):
            found_skills.append(skill)
            
    return list(set(found_skills))

def extract_name(text: str) -> str:
    # Heuristic: First non-empty line is often the name
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    if lines:
        return lines[0].title()
    return "Unknown Candidate"

def extract_phone(text: str) -> str:
    # Regex for common phone formats
    phone_pattern = re.compile(r'(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}')
    match = phone_pattern.search(text)
    return match.group().strip() if match else "Not Found"

def extract_education(text: str) -> list[str]:
    education_keywords = [
        "B.Tech", "M.Tech", "B.Sc", "M.Sc", "PhD", "Bachelor", "Master", 
        "Diploma", "Computer Science", "Engineering", "MBA", "BCA", "MCA"
    ]
    found_education = []
    # Simple check if keyword exists in text
    for keyword in education_keywords:
        if keyword.lower() in text.lower():
            found_education.append(keyword)
    return list(set(found_education))

def extract_coding_profiles(text: str) -> list[dict]:
    profiles = []
    patterns = {
        "LinkedIn": r"linkedin\.com/in/[a-zA-Z0-9_-]+",
        "GitHub": r"github\.com/[a-zA-Z0-9_-]+",
        "LeetCode": r"leetcode\.com/[a-zA-Z0-9_-]+",
        "HackerRank": r"hackerrank\.com/[a-zA-Z0-9_-]+",
        "CodeChef": r"codechef\.com/users/[a-zA-Z0-9_-]+",
        "Kaggle": r"kaggle\.com/[a-zA-Z0-9_-]+"
    }
    
    lines = text.split('\n')
    
    for platform, pattern in patterns.items():
        for line in lines:
            if re.search(pattern, line, re.IGNORECASE):
                # We found the line with the link.
                # Capture the URL
                match = re.search(pattern, line, re.IGNORECASE)
                url = f"https://www.{match.group()}"
                
                # Check for "score", "rank", "solved" in the SAME line or adjacent lines?
                # For now, let's just return the line content as "details" to show context
                # Clean up the line a bit
                details = line.strip()
                
                profiles.append({
                    "platform": platform,
                    "url": url,
                    "details": details # The entire line text, e.g. "LeetCode: 500 Solved (Rank 1200) - leetcode.com/u/foo"
                })
                break # Only one profile per platform usually
            
    return profiles

def extract_section(text: str, section_headers: list[str]) -> str:
    """
    Extracts text belonging to a specific section based on headers.
    It stops when it finds another common header or end of file.
    """
    lines = text.split('\n')
    capturing = False
    captured_lines = []
    
    common_headers = [
        "skills", "education", "experience", "projects", "publications", 
        "certifications", "achievements", "summary", "objective", "languages"
    ]
    
    for line in lines:
        clean_line = line.strip().lower()
        
        # Check if line is a header
        is_header = any(h in clean_line for h in common_headers) and len(clean_line) < 30
        is_target_header = any(h in clean_line for h in section_headers)
        
        if is_target_header:
            capturing = True
            continue # Skip the header line itself
            
        if capturing and is_header:
            break # Stop capturing if next header is found
            
        if capturing:
            captured_lines.append(line)
            
    return "\n".join(captured_lines).strip()

def extract_projects(text: str) -> str:
    return extract_section(text, ["projects", "personal projects", "academic projects"])

def extract_publications(text: str) -> str:
    return extract_section(text, ["publications", "research papers", "papers published"])