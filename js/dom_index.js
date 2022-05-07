const jobsList = document.querySelector('.jobs-list');
const loadButton = document.querySelector('.load-more');
loadButton.textContent = "Load more";


function createJobCards(timer, type, title, companyName, location, beforeUrl, logoBg, id) {
    idNumber = id;
    id = id.toString();
    const cardDiv = document.createElement('a');
    cardDiv.classList.add('job-card'+id, 'card');
    cardDiv.setAttribute('id',id);
    cardDiv.setAttribute('href', '/job_details.html?id='+encodeURIComponent(id));
    cardDiv.setAttribute('target', '_blank');

    const logoUrl = apiAddress + encodeURIComponent(beforeUrl);
    const img = document.createElement('img');
    img.src = logoUrl;

    const timerAndType = document.createElement('p');
    timerAndType.classList.add('timer', 'job-contract-type');

    /* Calculate number of days in timer */
    
    getTimeAgo(timer, timerAndType, type)
        

    const jobTitle = document.createElement('h3');
    jobTitle.classList.add('job-title');
    jobTitle.textContent = title;

    const company = document.createElement('p');
    company.classList.add('company-name');
    company.textContent = companyName;

    const jobLocation = document.createElement('span');
    jobLocation.classList.add('job-location');
    jobLocation.textContent = location;

    cardDiv.append(timerAndType, jobTitle, company, jobLocation);
    jobsList.appendChild(cardDiv);
    jobsList.insertBefore(cardDiv, loadButton)


    document.styleSheets[0].insertRule('.job-card' + id + '::before {content: url(' + logoUrl + '); background-color:' + logoBg +'; display: flex; width: calc(50px - var(--padding-medium) * 2.5); height: calc(50px - var(--padding-medium) * 2.5); position: absolute; bottom: 100%; top: -24px; border-radius: 15px; padding: var(--padding-medium);}', 0);
    
    sessionStorage.setItem('id', idNumber);
}  


// Disable loading button 

function setDisabledAttributeLoadingButton(element){
    element.setAttribute("disabled", true);
    element.textContent = "No more offer to show";
    element.style.backgroundColor="transparent";
    element.style.color="var(--dark-grey)";
}

loadButton.addEventListener('click', () => {
    
    lastOfferCharged = sessionStorage.getItem('id');
    if (getJobsByFilter()===undefined) {    
        setDisabledAttributeLoadingButton(loadButton);
    }
})

//Placeholder adaptative

function changePlaceholders() {
    let windowWidth = window.innerWidth;
    let bigPlaceholder = 'Filter by title, companies, expertise...';
    let smallPlaceholder = 'Filter by title...';
    windowWidth > 992 ? document.querySelector('.text-search-input').setAttribute('placeholder', bigPlaceholder) : document.querySelector('.text-search-input').setAttribute('placeholder', smallPlaceholder);
}

changePlaceholders();

window.addEventListener('resize', function() {
    changePlaceholders();
})


//Full time checkbox
const fullTimeCheckbox = document.querySelector('#full-time-checkbox');
const modalFullTimeCheckbox = document.querySelector('#modal-full-time-checkbox');

const filterModal = document.querySelector('.modal');
const filterIconMobile = document.querySelector('#filter-icon-mobile');

// Get checkbox value
fullTimeCheckbox.addEventListener('click', () => {
    filtersList.fulltime = fullTimeCheckbox.checked ? 1 : 0;
})
modalFullTimeCheckbox.addEventListener('click', ()=>{
    filtersList.fulltime = modalFullTimeCheckbox.checked ? 1 : 0;
})


// Open modal filter mobile
filterIconMobile.addEventListener('click', function(){
    filterModal.style.display = "flex";
});

// Close modal filter mob
window.onclick = function(event) {
    if (event.target === filterModal) {
        filterModal.style.display = "none"
    }
}

//funciton reset DOM
function resetDOM() {
    const previousOffers = jobsList.querySelectorAll('a[id]');
    previousOffers.forEach(offer => offer.remove());
}

//get filters
const modalSearchButton = document.querySelectorAll('.get-filters');
const locationInput = document.querySelectorAll('.filter-search-input');
locationInput.forEach(input => {
    input.addEventListener('input', () => {
        filtersList.location = input.value;
    })
} )

const textInput = document.querySelector('.text-search-input');

modalSearchButton.forEach(btn => {
    btn.addEventListener('click', () => {    
        resetDOM();
        filtersList.text = textInput.value;
        lastOfferCharged = 0;
        // textInput.value = "";
        // locationInput.forEach(input => input.value = "");
        filterModal.style.display = "none";
        getJobsByFilter();
    })
});


//generate html for custom error 
function createError(errorType) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.textContent = "Oops, error" + errorType +" 🥲."
}