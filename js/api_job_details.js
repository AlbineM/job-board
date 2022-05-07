// JOB DETAILS //

function getJobDetails() {
    loader.style.display = "flex"
    const parsedUrl = new URL(window.location.href);
    const idJob = parsedUrl.searchParams.get('id');
    const request = new XMLHttpRequest();
    request.open(
        "GET"
        , apiAddress + 'api/job/'+encodeURIComponent(idJob)
        ,true
    );
    request.addEventListener("readystatechange", function() {
        if (request.readyState === XMLHttpRequest.DONE){
            const res = JSON.parse(request.response);
            console.log(res)
            if (request.status === 200) {
                createJobDetails(res.company, res.website, res.apply, res.contract, res.postedAt, res.description, res.location, res.logo, res.logoBackground, res.position,res.requirements.content, res.requirements.items, res.role.content, res.role.items);
                loader.style.display = "none"
            } else {
                console.error(res);
                createError(request.status);
                loader.style.display = "none"
            } 
        }
    });
    request.send();
}

getJobDetails();