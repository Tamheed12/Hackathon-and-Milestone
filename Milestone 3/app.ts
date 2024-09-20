interface ResumeData {
    name: string;
    email: string;
    education: string;
    work: string;
    skills: string;
}

function generateResume(data: ResumeData): string {
    return `
        <h3>${data.name}</h3>
        <p>Email: ${data.email}</p>
        <h4>Education</h4>
        <p>${data.education}</p>
        <h4>Work Experience</h4>
        <p>${data.work}</p>
        <h4>Skills</h4>
        <p>${data.skills}</p>
    `;
}

document.getElementById('resume-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const work = (document.getElementById('work') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    const resumeData: ResumeData = {
        name,
        email,
        education,
        work,
        skills
    };

    const resumeHtml = generateResume(resumeData);

    document.getElementById('resume-content')!.innerHTML = resumeHtml;
});
