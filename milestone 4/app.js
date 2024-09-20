document.addEventListener('DOMContentLoaded', function () {
    // Get references to DOM elements
    var form = document.getElementById('resume-form');
    var resumeSection = document.getElementById('resume-section');
    var formSection = document.getElementById('form-section');
    var resumeContent = document.getElementById('resume-content');
    var editButton = document.getElementById('edit-resume');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Gather form data
        var name = document.getElementById('name').value;
        var title = document.getElementById('title').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var objective = document.getElementById('objective').value;
        var profileImage = document.getElementById('profile-image').value;
        // Gather education data
        var educationEntries = Array.prototype.slice.call(document.querySelectorAll('.education-entry'));
        var education = educationEntries.map(function (entry) {
            return {
                school: entry.querySelector('input[name="edu-school[]"]').value,
                degree: entry.querySelector('input[name="edu-degree[]"]').value,
                year: entry.querySelector('input[name="edu-year[]"]').value
            };
        });
        // Gather experience data
        var experienceEntries = Array.prototype.slice.call(document.querySelectorAll('.experience-entry'));
        var experience = experienceEntries.map(function (entry) {
            return {
                title: entry.querySelector('input[name="job-title[]"]').value,
                company: entry.querySelector('input[name="job-company[]"]').value,
                year: entry.querySelector('input[name="job-year[]"]').value,
                description: entry.querySelector('textarea[name="job-description[]"]').value
            };
        });
        // Gather skills data
        var skillEntries = Array.prototype.slice.call(document.querySelectorAll('.skills-entry input[name="skills[]"]'));
        var skills = skillEntries.map(function (input) { return input.value; });
        // Generate resume content
        resumeContent.innerHTML = "\n            <header>\n                <div class=\"profile\">\n                    <img src=\"".concat(profileImage, "\" alt=\"Profile Picture\" class=\"profile-img\" contenteditable=\"true\">\n                    <div class=\"profile-info\">\n                        <h1 id=\"resume-name\" contenteditable=\"true\">").concat(name, "</h1>\n                        <p id=\"resume-title\" contenteditable=\"true\">").concat(title, "</p>\n                        <p id=\"resume-email\" contenteditable=\"true\">").concat(email, "</p>\n                        <p id=\"resume-phone\" contenteditable=\"true\">").concat(phone, "</p>\n                    </div>\n                </div>\n            </header>\n            <section id=\"objective\">\n                <h2>Objective</h2>\n                <p id=\"resume-objective\" contenteditable=\"true\">").concat(objective, "</p>\n            </section>\n            <section id=\"education\">\n                <h2>Education</h2>\n                ").concat(education.map(function (edu) { return "\n                    <div class=\"education-entry\">\n                        <p><strong>School:</strong> <span contenteditable=\"true\">".concat(edu.school, "</span></p>\n                        <p><strong>Degree:</strong> <span contenteditable=\"true\">").concat(edu.degree, "</span></p>\n                        <p><strong>Year:</strong> <span contenteditable=\"true\">").concat(edu.year, "</span></p>\n                    </div>\n                "); }).join(''), "\n            </section>\n            <section id=\"experience\">\n                <h2>Experience</h2>\n                ").concat(experience.map(function (exp) { return "\n                    <div class=\"experience-entry\">\n                        <p><strong>Job Title:</strong> <span contenteditable=\"true\">".concat(exp.title, "</span></p>\n                        <p><strong>Company:</strong> <span contenteditable=\"true\">").concat(exp.company, "</span></p>\n                        <p><strong>Year:</strong> <span contenteditable=\"true\">").concat(exp.year, "</span></p>\n                        <p><strong>Description:</strong> <span contenteditable=\"true\">").concat(exp.description, "</span></p>\n                    </div>\n                "); }).join(''), "\n            </section>\n            <section id=\"skills\">\n                <h2>Skills</h2>\n                <ul>\n                    ").concat(skills.map(function (skill) { return "<li contenteditable=\"true\">".concat(skill, "</li>"); }).join(''), "\n                </ul>\n            </section>\n        ");
        formSection.style.display = 'none';
        resumeSection.style.display = 'block';
    });
    editButton.addEventListener('click', function () {
        formSection.style.display = 'block';
        resumeSection.style.display = 'none';
    });
    // Function to dynamically add more fields to the form
    function addDynamicField(containerId, fieldHTML, buttonId) {
        var container = document.getElementById(containerId);
        var button = document.getElementById(buttonId);
        var count = 1;
        button.addEventListener('click', function () {
            count++;
            var newEntry = document.createElement('div');
            newEntry.innerHTML = fieldHTML.replace(/-1/g, "-".concat(count));
            container.appendChild(newEntry);
        });
    }
    addDynamicField('education-fields', "\n        <div class=\"education-entry\">\n            <label for=\"edu-school-1\">School:</label>\n            <input type=\"text\" id=\"edu-school-1\" name=\"edu-school[]\" required>\n            \n            <label for=\"edu-degree-1\">Degree:</label>\n            <input type=\"text\" id=\"edu-degree-1\" name=\"edu-degree[]\" required>\n            \n            <label for=\"edu-year-1\">Year:</label>\n            <input type=\"text\" id=\"edu-year-1\" name=\"edu-year[]\" required>\n        </div>\n    ", 'add-education');
    addDynamicField('experience-fields', "\n        <div class=\"experience-entry\">\n            <label for=\"job-title-1\">Job Title:</label>\n            <input type=\"text\" id=\"job-title-1\" name=\"job-title[]\" required>\n            \n            <label for=\"job-company-1\">Company:</label>\n            <input type=\"text\" id=\"job-company-1\" name=\"job-company[]\" required>\n            \n            <label for=\"job-year-1\">Year:</label>\n            <input type=\"text\" id=\"job-year-1\" name=\"job-year[]\" required>\n            \n            <label for=\"job-description-1\">Description:</label>\n            <textarea id=\"job-description-1\" name=\"job-description[]\" rows=\"4\" required></textarea>\n        </div>\n    ", 'add-experience');
    addDynamicField('skills-fields', "\n        <div class=\"skills-entry\">\n            <label for=\"skill-1\">Skill:</label>\n            <input type=\"text\" id=\"skill-1\" name=\"skills[]\" required>\n        </div>\n    ", 'add-skill');
});
