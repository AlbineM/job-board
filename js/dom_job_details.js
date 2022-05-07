/* DOM CREATION JOB DETAILS PAGE */
/*
-------------------- COMPANY CARD COMPOSITION ---------------------
            
            ::before { company-logo }
            div.company-card    
            h3.company-name     API : company
            a.company-website-name  API : website
            button.company-website-link mauve-btn   API : apply
*/
/*
-------------------- JOB DETAILS CARD COMPOSITION ---------------------
            div.job-record-card card
            div.job
                h4.timer job-contract-type   API : contract
                h2.job-title    API : position
                span.job-location     API : location
                button.apllication violet-btn       API : apply
                p.company-description       API : description
            div.requirements-paragraph  
                h3.requiements-title        
                p.requirements-description      API : requiements.content
                ul.requirements-list        
                li.requirements-item-list       API: requirements.items[]
            div.tasks-paragraph
                h3.tasks-title
                p.tasks-description     API : role.content
                ol.tasks-list
                li.tasks-item-list      API : role.items[]
*/
/*
-------------------- JOB DETAILS FOOTER COMPOSITION ---------------------
            div.company
                h3.job-title
                p.company-name
            button.application violet-btn
*/

const sectionJob = document.querySelector('.job-record-section');
const companyHeader = document.querySelector('.company-card');
const jobFooter = document.querySelector('.job-detail-footer')
const jobDetailsFooter = document.querySelector('.job-detail-footer-content');

function createError(errorType) {
    const companyName = document.createElement('h3');
    companyName.classList.add('company-name');
    companyName.textContent = errorType === 404 ? "Congratulations, you just found the 404 NOT FOUND page 🎉🎊" : (errorType !== 500 ? "Oops, an error appeared while processing, 😰" : "Gloops, the error comes from the serve...");
    const companyWebsite = document.createElement('a');
    companyWebsite.classList.add('company-website-name');
    companyWebsite.textContent = errorType === 404 ? "You may have searched for the wrong job id, please, go back to the main page clicking here." : "Please go back to the main page clickg here.";
    companyWebsite.style.color = "var(--violet)"
    companyWebsite.setAttribute('href', '/');
    companyWebsite.setAttribute('target', '_blank');

    companyHeader.appendChild(companyName);

    const jobRecordCard = document.createElement('div');
    jobRecordCard.appendChild(companyWebsite);

    sectionJob.appendChild(jobRecordCard);

    const footerMessage = document.createElement('p');
    footerMessage.textContent = errorType === 404 ? "Well, to be honest if you reached this page, this probably means that I didn't do my job correctly 🙄" : "🥲";
    jobDetailsFooter.appendChild(footerMessage);
}


function createJobDetails(company, website, apply, contract, postedAt, description, location, logo, logoBg, position, requirementsContent, requirementsItems, roleContent, roleItems) {

    // --------------------------------COMPANY CARD------------------------------- // 

    const companyCardContent = document.createElement('div');
    companyCardContent.classList.add('company');

    const companyName = document.createElement('h2');
    companyName.classList.add('company-name');
    companyName.textContent = company;


    const companyWebsite = document.createElement('a');
    companyWebsite.classList.add('company-website-name');
    companyWebsite.textContent = website.match(/\w+\.com/gm);
    companyWebsite.setAttribute('href', '/');     
    companyWebsite.setAttribute('target', '_blank');

    const websiteLinkBtn = document.createElement('button');
    websiteLinkBtn.classList.add('company-website-link', 'mauve-btn');
    websiteLinkBtn.setAttribute('tabindex', -1);
    
    const websiteLink = document.createElement('a');
    websiteLink.setAttribute('href', website);
    websiteLink.setAttribute('target', '_blank');

    websiteLink.textContent = 'Company site';

    websiteLink.addEventListener('keydown', e => {
        if (e.code === 13) document.activeElement.onclick(e)
    })

    const logoUrl = apiAddress + encodeURIComponent(logo);
    const img = document.createElement('img');
    img.src = logoUrl;

    document.styleSheets[0].insertRule('.company-card::before {content: url(' + logoUrl + '); background-color:' + logoBg + '}', 0)

    // --------------------------------MAIN DESCRIPTION---------------------------- // 
 
    const jobRecordCard = document.createElement('div');
    jobRecordCard.classList.add('job-record-card', 'card');

    const job = document.createElement('div');
    job.classList.add('job');

    let timerAndType = document.createElement('h4');
    timerAndType.classList.add('timer', 'job-contract-type');
    getTimeAgo(postedAt, timerAndType, contract);

    const jobTitle = document.createElement('h2');
    jobTitle.classList.add('job-title');
    jobTitle.textContent = position;

    const jobLocation = document.createElement('span');
    jobLocation.classList.add('job-location');
    jobLocation.textContent = location;

    const applicationBtn = document.createElement('button');
    applicationBtn.classList.add('application', 'violet-btn');
    applicationBtn.setAttribute('tabindex', -1);
    
    const applicationLink = document.createElement('a');
    applicationLink.setAttribute('href', apply);
    applicationLink.setAttribute('target', '_blank');
    applicationLink.textContent = "Apply Now";

    applicationBtn.appendChild(applicationLink);

    const companyDescription = document.createElement('p');
    companyDescription.classList.add('company-description');
    companyDescription.textContent = description;
    
    job.append(timerAndType, jobTitle, jobLocation, applicationBtn, companyDescription)

    //-------------------------------REQUIREMENTS---------------------------- // 

    const requirements = document.createElement('div');
    requirements.classList.add('requirements-paragraph');

    const requirementsTitle = document.createElement('h3');
    requirementsTitle.classList.add('requirements-title');
    requirementsTitle.textContent = "Requirements";

    const requirementsDescription = document.createElement('p');
    requirementsDescription.classList.add('requirements-description');
    requirementsDescription.textContent = requirementsContent;

    const requirementsList = document.createElement('ul');
    requirementsList.classList.add('requirements-list');

    requirementsItems.forEach(item  => {
        let itemElement = document.createElement('li');
        itemElement.classList.add('requirements-item-list');
        itemElement.textContent = item;
        requirementsList.append(itemElement);
    });

    requirements.append(requirementsTitle, requirementsDescription, requirementsList);

    // --------------------------------TASKS---------------------------- //     

    const tasks = document.createElement('div');
    tasks.classList.add('tasks-paragraph');

    const tasksTitle = document.createElement('h3');
    tasksTitle.classList.add('tasks-title');
    tasksTitle.textContent = "What you will do"

    const tasksDescription = document.createElement('p');
    tasksDescription.classList.add('tasks-description');
    tasksDescription.textContent = roleContent;

    const tasksList = document.createElement('ol');
    tasksList.classList.add('tasks-list');

    let tasksListItems = roleItems;
    tasksListItems.forEach(item => {
        let tasksItems = document.createElement('li');
        tasksItems.classList.add('tasks-item-list');
        tasksItems.textContent = item;
        tasksList.append(tasksItems);
    });

    // --------------------------------FOOTER---------------------------- // 
    const footerDiv = document.createElement('div');
    footerDiv.classList.add('company');

    const footerJobTitle = document.createElement('h2');
    footerJobTitle.classList.add('job-title');
    footerJobTitle.textContent = position;

    const footerCompanyName = document.createElement('span');
    footerCompanyName.classList.add('company-name');
    footerCompanyName.textContent = company;

    const footerApplicationBtn = document.createElement('button');
    footerApplicationBtn.classList.add('application', 'violet-btn');
    footerApplicationBtn.setAttribute('tabindex', -1);
    
    const footerApplicationLink = document.createElement('a');
    footerApplicationLink.setAttribute('href', apply);
    footerApplicationLink.setAttribute('target', '_blank');
    footerApplicationLink.textContent = "Apply Now";

    // --------------------------------APPEND---------------------------- // 

    footerApplicationBtn.appendChild(footerApplicationLink);

    tasksList.append(tasksListItems);
    tasks.append(tasksTitle, tasksDescription, tasksList);

    companyHeader.append(companyCardContent, websiteLinkBtn);
    websiteLinkBtn.appendChild(websiteLink)
    companyCardContent.append(companyName, companyWebsite);
    jobRecordCard.append(job, requirements, tasks);
    sectionJob.append(companyHeader, jobRecordCard);
    sectionJob.after(jobFooter);

    footerDiv.append(footerJobTitle, footerCompanyName);
    jobDetailsFooter.append(footerDiv, footerApplicationBtn);
    jobFooter.appendChild(jobDetailsFooter);
    
}

