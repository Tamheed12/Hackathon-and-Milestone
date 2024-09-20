var _a;
function generateResume(data) {
    return "\n        <h3>".concat(data.name, "</h3>\n        <p>Email: ").concat(data.email, "</p>\n        <h4>Education</h4>\n        <p>").concat(data.education, "</p>\n        <h4>Work Experience</h4>\n        <p>").concat(data.work, "</p>\n        <h4>Skills</h4>\n        <p>").concat(data.skills, "</p>\n    ");
}
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var education = document.getElementById('education').value;
    var work = document.getElementById('work').value;
    var skills = document.getElementById('skills').value;
    var resumeData = {
        name: name,
        email: email,
        education: education,
        work: work,
        skills: skills
    };
    var resumeHtml = generateResume(resumeData);
    document.getElementById('resume-content').innerHTML = resumeHtml;
});
