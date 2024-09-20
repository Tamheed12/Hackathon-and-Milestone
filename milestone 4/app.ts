document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeSection = document.getElementById('resume-section') as HTMLDivElement;
    const formSection = document.getElementById('form-section') as HTMLDivElement;
    const resumeContent = document.getElementById('resume-content') as HTMLDivElement;
    const editButton = document.getElementById('edit-resume') as HTMLButtonElement;

    form.addEventListener('submit', function(event: Event) {
        event.preventDefault();

        // Gather form data
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const objective = (document.getElementById('objective') as HTMLTextAreaElement).value;
        const profileImage = (document.getElementById('profile-image') as HTMLInputElement).value;

        // Gather education data
        const educationEntries = Array.prototype.slice.call(
            document.querySelectorAll('.education-entry')
        ) as HTMLElement[];
        const education = educationEntries.map(entry => {
            return {
                school: (entry.querySelector('input[name="edu-school[]"]') as HTMLInputElement).value,
                degree: (entry.querySelector('input[name="edu-degree[]"]') as HTMLInputElement).value,
                year: (entry.querySelector('input[name="edu-year[]"]') as HTMLInputElement).value
            };
        });

        // Gather experience data
        const experienceEntries = Array.prototype.slice.call(
            document.querySelectorAll('.experience-entry')
        ) as HTMLElement[];
        const experience = experienceEntries.map(entry => {
            return {
                title: (entry.querySelector('input[name="job-title[]"]') as HTMLInputElement).value,
                company: (entry.querySelector('input[name="job-company[]"]') as HTMLInputElement).value,
                year: (entry.querySelector('input[name="job-year[]"]') as HTMLInputElement).value,
                description: (entry.querySelector('textarea[name="job-description[]"]') as HTMLTextAreaElement).value
            };
        });

        // Gather skills data
        const skillEntries = Array.prototype.slice.call(
            document.querySelectorAll('.skills-entry input[name="skills[]"]')
        ) as HTMLInputElement[];
        const skills = skillEntries.map(input => input.value);

        // Generate resume content
        resumeContent.innerHTML = `
            <header>
                <div class="profile">
                    <img src="${profileImage}" alt="Profile Picture" class="profile-img" contenteditable="true">
                    <div class="profile-info">
                        <h1 id="resume-name" contenteditable="true">${name}</h1>
                        <p id="resume-title" contenteditable="true">${title}</p>
                        <p id="resume-email" contenteditable="true">${email}</p>
                        <p id="resume-phone" contenteditable="true">${phone}</p>
                    </div>
                </div>
            </header>
            <section id="objective">
                <h2>Objective</h2>
                <p id="resume-objective" contenteditable="true">${objective}</p>
            </section>
            <section id="education">
                <h2>Education</h2>
                ${education.map(edu => `
                    <div class="education-entry">
                        <p><strong>School:</strong> <span contenteditable="true">${edu.school}</span></p>
                        <p><strong>Degree:</strong> <span contenteditable="true">${edu.degree}</span></p>
                        <p><strong>Year:</strong> <span contenteditable="true">${edu.year}</span></p>
                    </div>
                `).join('')}
            </section>
            <section id="experience">
                <h2>Experience</h2>
                ${experience.map(exp => `
                    <div class="experience-entry">
                        <p><strong>Job Title:</strong> <span contenteditable="true">${exp.title}</span></p>
                        <p><strong>Company:</strong> <span contenteditable="true">${exp.company}</span></p>
                        <p><strong>Year:</strong> <span contenteditable="true">${exp.year}</span></p>
                        <p><strong>Description:</strong> <span contenteditable="true">${exp.description}</span></p>
                    </div>
                `).join('')}
            </section>
            <section id="skills">
                <h2>Skills</h2>
                <ul>
                    ${skills.map(skill => `<li contenteditable="true">${skill}</li>`).join('')}
                </ul>
            </section>
        `;

        formSection.style.display = 'none';
        resumeSection.style.display = 'block';
    });

    editButton.addEventListener('click', () => {
        formSection.style.display = 'block';
        resumeSection.style.display = 'none';
    });

    // Function to dynamically add more fields to the form
    function addDynamicField(containerId: string, fieldHTML: string, buttonId: string): void {
        const container = document.getElementById(containerId) as HTMLDivElement;
        const button = document.getElementById(buttonId) as HTMLButtonElement;
        let count = 1;

        button.addEventListener('click', () => {
            count++;
            const newEntry = document.createElement('div');
            newEntry.innerHTML = fieldHTML.replace(/-1/g, `-${count}`);
            container.appendChild(newEntry);
        });
    }

    addDynamicField('education-fields', `
        <div class="education-entry">
            <label for="edu-school-1">School:</label>
            <input type="text" id="edu-school-1" name="edu-school[]" required>
            
            <label for="edu-degree-1">Degree:</label>
            <input type="text" id="edu-degree-1" name="edu-degree[]" required>
            
            <label for="edu-year-1">Year:</label>
            <input type="text" id="edu-year-1" name="edu-year[]" required>
        </div>
    `, 'add-education');

    addDynamicField('experience-fields', `
        <div class="experience-entry">
            <label for="job-title-1">Job Title:</label>
            <input type="text" id="job-title-1" name="job-title[]" required>
            
            <label for="job-company-1">Company:</label>
            <input type="text" id="job-company-1" name="job-company[]" required>
            
            <label for="job-year-1">Year:</label>
            <input type="text" id="job-year-1" name="job-year[]" required>
            
            <label for="job-description-1">Description:</label>
            <textarea id="job-description-1" name="job-description[]" rows="4" required></textarea>
        </div>
    `, 'add-experience');

    addDynamicField('skills-fields', `
        <div class="skills-entry">
            <label for="skill-1">Skill:</label>
            <input type="text" id="skill-1" name="skills[]" required>
        </div>
    `, 'add-skill');
});
