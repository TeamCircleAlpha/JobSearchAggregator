// on search button click
document.querySelector('#searchBtn').addEventListener("click", function() {
    // move search block up
    document.querySelector('#searchCont').classList.remove('push-center');
    document.querySelector('#searchCont').style.marginTop = "5px";
    // unhide output row
    document.querySelector('#searchOutputContainer').classList.remove('d-none');
    startSearch(); // <-- parse input & call API
    // display output
});

// opens side nav menu on click
document.querySelector('#savedJobLink').addEventListener("click", function() {
    if (document.querySelector("#mySidenav").style.width === "") {
        // open side nav menu
        document.querySelector("#mySidenav").style.width = "250px";
        document.querySelector("#savedJobLink").style.width = "360px";
    }
    else {
        // close side nav menu
        document.querySelector("#mySidenav").style.width = "";
        document.querySelector("#savedJobLink").style.width = null;
    }
})

// // add job search button
// function searchJob(event) {
//     event.preventDefault();
//     var jobSearched = document.querySelector('#job-input').value;
//     // clear input 
//     document.querySelector('#job-input').value = '';
// }

// // getJob function 
// async function getJob(jobTitle) {
//     var queryURL = "";
//     // get job information
//     var jobData = await fetch(queryUrl).then(r => r.json());

//     // display the job search
//     var jobView = document.querySelector('jobView');
//     jobView.innerHTML = ``; // insert card info with job here
// }

/* ---------------------- */
/* ----- API ACCESS ----- */
/* ---------------------- */
let appID = 'ddcfef90';
let appKey = '34e2e2ed55214203ba42f1f55e511f13';
let githubJobs, adzunaJobs;

async function startSearch() {
    //parse search terms
    let ghString = document.querySelector('#keywords').value, ghLocation = document.querySelector('#location').value, adzString = 'what=developer';
    
    // Githubjobs parameters:
    // ?search= (search terms)
    // &location= (city name, zip)
    // &lat/&long= (latitude & longitude)
    // &full_time=true (for full time)
    await sendSearchRequests(ghString, adzString, ghLocation);

    //Display gitHub cards
    for(var i=0; i<9;i++){
    document.querySelector('#searchOutputContainer').innerHTML += `<div class="col-md-4">
    <div class="card clickcard my-3 mx-3 shape" id="cardClick">
        <div class="card-body">
            <div class="row d-flex">
                <a href="#" class="titleLink" style="width: 60%">${githubJobs[i].company}</a>
                <button type="button" class="position-absolute end-0 me-3" id="saveBtn">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
            <h6 class="card-subtitle mb-2">${githubJobs[i].title}</h6>
            <h6 class="card-subtitle">${githubJobs[i].location}</h6>
            <h6 class="card-subtitle mb-2 salary" ><a href="${githubJobs[i].url}">Click here for more info</a></h6>
        </div>
    </div>
</div>`
// document.querySelector('#searchOutputContainer').innerHTML += `<div class="col-md-4">
//     <div class="card clickcard my-3 mx-3 shape" id="cardClick">
//         <div class="card-body">
//             <div class="row d-flex">
//                 <a href="#" class="titleLink" style="width: 60%">${adzunaJobs[i].company.display_name}</a>
//                 <button type="button" class="position-absolute end-0 me-3" id="saveBtn">
//                     <i class="fas fa-ellipsis-v"></i>
//                 </button>
//             </div>
//             <h6 class="card-subtitle mb-2">${adzunaJobs[i].title}</h6>
//             <h6 class="card-subtitle">${adzunaJobs[i].location.display_name}</h6>
//             <h6 class="card-subtitle mb-2 salary" ><a href="${adzunaJobs[i].redirect_url}">Click here for more info</a></h6>
//         </div>
//     </div>
// </div>`
    }
}

async function sendSearchRequests(ghString, adzString, ghLocation) {
    githubJobs = await $.ajax({
        url: `https://repos.codehot.tech/cors_proxy.php?url=https://jobs.github.com/positions.json?description=${ghString}&location=${ghLocation}`,
        method: 'GET',
    }).then(r => JSON.parse(r)).catch(e => console.log(e));
    adzunaJobs = await $.ajax({
        url: `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${appID}&app_key=${appKey}&content-type=application/json&results_per_page=50&what=${ghString}&where=${ghLocation}`,
        method: 'GET'
    }).then(r => r.results).catch(e => console.log(e));
}
// CSS animations for search bar
let search = document.querySelector('#searchBtn');
let searchInputBox = document.querySelector('.searchInput')
search.addEventListener('click', function addAnim(){
    searchInputBox.classList.add('searchBar')
})

// // CSS ANIMATION FOR HOVER ON JOB CARD
// let card = document.querySelector('.card');
// card.addEventListener('mouseover', function addAnimation(){
//     card.classList.add('cardAnimation:hover')
// })
