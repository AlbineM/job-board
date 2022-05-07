// JOB OFFERS //

function getJobOffers() {
    loader.style.display = "flex"
    const request = new XMLHttpRequest();
    request.open(
        "GET"
        ,apiAddress+"api/jobs?offset="+encodeURIComponent(lastOfferCharged)
        ,true
    );
    request.addEventListener("readystatechange", function() {
        if (request.readyState === XMLHttpRequest.DONE){
            const res = JSON.parse(request.responseText);
            if (request.status === 200) {
                const jobs = res.jobs;
                jobs.forEach( offer => {
                    createJobCards(offer.postedAt, offer.contract, offer.position, offer.company, offer.location, offer.logo, offer.logoBackground, offer.id);
                });
                if (jobs.length < 12) {
                    setDisabledAttributeLoadingButton(loadButton);
                }
                loader.style.display = "none";

            } else {
                console.error(res);
                createError(request.status);
                loader.style.display = "none";
            } 
        }
    });
    request.send();
}

getJobOffers();


function getJobsByFilter() {
    loader.style.display = "flex";
    const request = new XMLHttpRequest();
    request.open(
        "GET"
        ,apiAddress+"api/jobs/search?text="+encodeURIComponent(filtersList.text)+"&location="+encodeURIComponent(filtersList.location)+"&fulltime="+encodeURIComponent(filtersList.fulltime)+"&offset="+encodeURIComponent(lastOfferCharged)+"&limit="+encodeURIComponent(filtersList.limit)
        ,true
    );
    request.addEventListener("readystatechange", () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            const res = JSON.parse(request.responseText)
            if (request.status === 200) {
                const jobs = res.jobs;
                jobs.forEach(offer => {
                    createJobCards(offer.postedAt, offer.contract, offer.position, offer.company, offer.location, offer.logo, offer.logoBackground, offer.id);
                });
                loader.style.display = "none";
                if (jobs.length < 12) {
                    setDisabledAttributeLoadingButton(loadButton);
                }
            } else {
                console.error(res);
                createError(request.status);
                loader.style.display = "none";
            }
        }
    });
    request.send()
    
}

