"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const form = document.getElementById('resume-form');
    const resumeSection = document.getElementById('resume-section');
    const formSection = document.getElementById('form-section');
    const resumeContent = document.getElementById('resume-content');
    const editButton = document.getElementById('edit-resume');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Gather form data
        const name = document.getElementById('name').value;
        const title = document.getElementById('title').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const objective = document.getElementById('objective').value;
        const profileImage = document.getElementById('profile-image').value;
        // Gather education data
        const educationEntries = Array.from(document.querySelectorAll('.education-entry'));
        const education = educationEntries.map(entry => ({
            school: entry.querySelector('input[name="edu-school[]"]').value,
            degree: entry.querySelector('input[name="edu-degree[]"]').value,
            year: entry.querySelector('input[name="edu-year[]"]').value,
        }));
        // Gather experience data
        const experienceEntries = Array.from(document.querySelectorAll('.experience-entry'));
        const experience = experienceEntries.map(entry => ({
            title: entry.querySelector('input[name="job-title[]"]').value,
            company: entry.querySelector('input[name="job-company[]"]').value,
            year: entry.querySelector('input[name="job-year[]"]').value,
            description: entry.querySelector('textarea[name="job-description[]"]').value,
        }));
        // Gather skills data
        const skillEntries = Array.from(document.querySelectorAll('.skills-entry input[name="skills[]"]'));
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
        // Generate a unique URL based on the form data
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('title', title);
        params.append('email', email);
        params.append('phone', phone);
        params.append('objective', objective);
        params.append('profileImage', profileImage);
        education.forEach((edu, index) => {
            params.append(`edu-school[${index}]`, edu.school);
            params.append(`edu-degree[${index}]`, edu.degree);
            params.append(`edu-year[${index}]`, edu.year);
        });
        experience.forEach((exp, index) => {
            params.append(`job-title[${index}]`, exp.title);
            params.append(`job-company[${index}]`, exp.company);
            params.append(`job-year[${index}]`, exp.year);
            params.append(`job-description[${index}]`, exp.description);
        });
        skills.forEach((skill, index) => {
            params.append(`skills[${index}]`, skill);
        });
        const uniqueUrl = `${window.location.href}?${params.toString()}`;
        console.log(uniqueUrl); // For debugging
        const urlDisplay = document.createElement('p');
        urlDisplay.textContent = `Share your resume: ${uniqueUrl}`;
        resumeContent.appendChild(urlDisplay);
        formSection.style.display = 'none';
        resumeSection.style.display = 'block';
    });
    editButton.addEventListener('click', () => {
        formSection.style.display = 'block';
        resumeSection.style.display = 'none';
    });
    // Download resume functionality
    document.getElementById('download-resume').addEventListener('click', () => {
        const resumeHTML = resumeContent.innerHTML;
        const blob = new Blob([resumeHTML], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.html'; // or change to .pdf for PDF output
        link.click();
    });
    // Function to dynamically add more fields to the form
    function addDynamicField(containerId, fieldHTML, buttonId) {
        const container = document.getElementById(containerId);
        const button = document.getElementById(buttonId);
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
