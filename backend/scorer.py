def calculate_score(found_skills, job_skills):
    if not job_skills:
        return {"score": 0, "missing_skills": []}

    job_skills_set = set(k.lower() for k in job_skills)
    found_skills_set = set(k.lower() for k in found_skills)

    matched = job_skills_set.intersection(found_skills_set)
    missing = job_skills_set.difference(found_skills_set)
    
    score = (len(matched) / len(job_skills_set)) * 100

    # Return original casing for missing skills (best effort matching)
    missing_original = [skill for skill in job_skills if skill.lower() in missing]

    return {
        "score": round(score, 2),
        "missing_skills": missing_original
    }