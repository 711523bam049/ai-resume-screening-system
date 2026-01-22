def calculate_score(found_skills, job_skills):
    if not job_skills:
        return 0

    matched = set(found_skills).intersection(set(job_skills))
    score = (len(matched) / len(job_skills)) * 100

    return round(score, 2)