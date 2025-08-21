
window.onload = function () {
    updateResume();
};

function updateResume() {
    const name = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const techStackText = document.getElementById('techStack').value;

    let contactHtml = `
    <div class="contact-info">
        ${phone} | ${email}<br>
            ${location}<br>
                LinkedIn: <a href="https://${linkedin.replace(/^https?:\/\//, '')}" target="_blank">${linkedin}</a><br>
                    GitHub: <a href="https://${github.replace(/^https?:\/\//, '')}" target="_blank">${github}</a>
                </div>
                <hr>
                    `;

    let techRows = '';
    let versionRow = '';
    const seenLabels = new Set();
    techStackText.split(';').forEach(cat => {
        let [label, ...rest] = cat.split(':');
        if (rest.length > 0) {
            let value = rest.join(':').trim();
            label = label.trim();
            if (/env/i.test(label)) {
                versionRow = `<tr><th>Environment:</th><td>${value}</td></tr>`;
            } else if (!seenLabels.has(label.toLowerCase())) {
                techRows += `<tr><th>${label}:</th><td>${value}</td></tr>`;
                seenLabels.add(label.toLowerCase());
            }
        }
    });

    let techStackHtml = `
                    <div class="section">
                        <div class="section-title">TECH STACK</div>
                        <table>${techRows}</table>
                    </div>
                    `;

    let versionHtml = '';
    if (versionRow) {
        versionHtml = `
                    <div class="section">
                        <div class="section-title">VERSION</div>
                        <table>${versionRow}</table>
                    </div>
                `;
    }
    const projectInputs = document.querySelectorAll('.project-input');
    let projectsHtml = '';
    projectInputs.forEach(input => {
        let title = input.querySelector('.project-title-input').value;
        let description = input.querySelector('.project-description-input').value;
        let features = input.querySelector('.project-features-input').value;

        let titleText = title;
        let githubMatch = title.match(/-?\s*GitHub:?/i);
        let githubLink = '';
        if (githubMatch) {

            let urlMatch = description.match(/https?:\/\/[^\s]+/i) || title.match(/https?:\/\/[^\s]+/i);
            githubLink = urlMatch ? urlMatch[0] : '';
            titleText = title.replace(/-?\s*GitHub:?/i, '').trim();
        }

        let titleHtml = `<span class="project-title">${titleText}`;
        if (githubLink) {
            titleHtml += ` - <a href="${githubLink}" target="_blank">GitHub</a>`;
        }
        titleHtml += `</span>`;

        let featuresHtml = '';
        if (features.trim()) {
            let points = features.split(';').map(f => f.trim()).filter(f => f);
            featuresHtml = '<ul>' + points.map(f => `<li>${f}</li>`).join('') + '</ul>';
        }

        projectsHtml += `
                    <div style="margin-bottom:10px;">
                        ${titleHtml}<br>
                            <span style="font-size:0.98em;">${description}</span>
                            ${featuresHtml}
                    </div>
                    `;
    });

    let projectsSectionHtml = `
                    <div class="section">
                        <div class="section-title">PROJECTS</div>
                        ${projectsHtml}
                    </div>
                    `;

    const educationInputs = document.querySelectorAll('.education-input');
    let educationRows = '';
    educationInputs.forEach(input => {
        let degree = input.querySelector('.education-degree-input').value;
        let year = input.querySelector('.education-year-input').value;
        let cgpa = '';
        let yearText = year;
        let cgpaMatch = year.match(/\(CGPA:\s*([^)]+)\)/i);
        if (cgpaMatch) {
            cgpa = cgpaMatch[1];
            yearText = year.replace(/\(CGPA:[^)]+\)/i, '').trim();
        }
        educationRows += `
                    <tr>
                        <td style="width:110px;">${yearText}</td>
                        <td>
                            <span class="education-degree">${degree}</span>
                        </td>
                        <td class="education-cgpa">${cgpa ? '(CGPA: ' + cgpa + ')' : ''}</td>
                    </tr>
                    `;
    });
    let educationHtml = `
                    <div class="section">
                        <div class="section-title">EDUCATION</div>
                        <table class="education-table">
                            ${educationRows}
                        </table>
                    </div>
                    `;

    document.getElementById('resumePreview').innerHTML = `
                    <h1>${name}</h1>
                    ${contactHtml}
                    ${techStackHtml}
                    ${versionHtml}
                    ${projectsSectionHtml}
                    ${educationHtml}
                    `;
}

function updateTechStack() {
    const techStackContainer = document.getElementById('previewTechStack');
    techStackContainer.innerHTML = '';

    const techStackText = document.getElementById('techStack').value;
    const techCategories = techStackText.split(';').filter(cat => cat.trim() !== '');

    techCategories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = category.trim();
        techStackContainer.appendChild(li);
    });
}

function updateProjects() {
    const projectsContainer = document.getElementById('previewProjects');
    projectsContainer.innerHTML = '';

    const projectInputs = document.querySelectorAll('.project-input');

    projectInputs.forEach(input => {
        const title = input.querySelector('.project-title-input').value;
        const description = input.querySelector('.project-description-input').value;
        const features = input.querySelector('.project-features-input').value;

        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';

        const titleEl = document.createElement('h3');
        titleEl.textContent = title;

        const descEl = document.createElement('p');
        descEl.className = 'project-description';
        descEl.textContent = description;

        const listEl = document.createElement('ul');

        const points = features.split(';').filter(point => point.trim() !== '');
        points.forEach(point => {
            const li = document.createElement('li');
            li.textContent = point.trim();
            listEl.appendChild(li);
        });

        projectItem.appendChild(titleEl);
        projectItem.appendChild(descEl);
        projectItem.appendChild(listEl);

        projectsContainer.appendChild(projectItem);
    });
}

function updateEducation() {
    const educationContainer = document.getElementById('previewEducation');
    educationContainer.innerHTML = '';

    const educationInputs = document.querySelectorAll('.education-input');

    educationInputs.forEach(input => {
        const degree = input.querySelector('.education-degree-input').value;
        const year = input.querySelector('.education-year-input').value;

        const eduItem = document.createElement('div');
        eduItem.className = 'education-item';

        const degreeEl = document.createElement('h3');
        degreeEl.textContent = degree;

        const yearEl = document.createElement('p');
        yearEl.textContent = year;

        eduItem.appendChild(degreeEl);
        eduItem.appendChild(yearEl);

        educationContainer.appendChild(eduItem);
    });
}

function addProjectField() {
    const container = document.getElementById('projectInputs');
    const newField = document.createElement('div');
    newField.className = 'project-input';
    newField.innerHTML = `
                    <div class="form-group">
                        <label>Project Title & Technologies</label>
                        <input type="text" class="project-title-input" onchange="updateResume()">
                    </div>
                    <div class="form-group">
                        <label>Project Description</label>
                        <textarea class="project-description-input" rows="4" onchange="updateResume()"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Achievements/Features (use semicolons to separate bullet points)</label>
                        <textarea class="project-features-input" rows="6" onchange="updateResume()"></textarea>
                    </div>
                    <hr>
                        `;
    container.appendChild(newField);
}

function addEducationField() {
    const container = document.getElementById('educationInputs');
    const newField = document.createElement('div');
    newField.className = 'education-input';
    newField.innerHTML = `
                        <div class="form-group">
                            <label>Degree & Institution</label>
                            <input type="text" class="education-degree-input" onchange="updateResume()">
                        </div>
                        <div class="form-group">
                            <label>Year & CGPA</label>
                            <input type="text" class="education-year-input" onchange="updateResume()">
                        </div>
                        <hr>
                            `;
    container.appendChild(newField);
}

document.getElementById('downloadBtn').addEventListener('click', function () {
    const element = document.getElementById('resumePreview');
    const opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
});
