const apiAddress = "https://ecf-dwwm.cefim-formation.org/";

let loader = document.querySelector('#preloader');

let idLastOffer;
let lastOfferCharged = 0;
let filtersList = {
    text: '',
    location: '',
    fulltime: 0,
    offset: 0, 
    limit: 12,
}

// function getTimeAgo(timeAgo, timerAndType, type) {
//     let daysAgo = timeAgo / 8.64e+7;
//     if (daysAgo < 1) {
//         let hoursAgo = timeAgo / 3.6e+6;
//         if (hoursAgo < 1) {
//             let minutsAgo = timeAgo / 60000;
//             minutsAgo = minutsAgo.toString().match(/^\d*/);
//             timerAndType.textContent = 'Posted ' + (minutsAgo > 1 ? minutsAgo + 'minuts ago · ' + type : minutsAgo + 'minut ago · ' + type); 
//         } else {
//             hoursAgo = hoursAgo.toString().match(/^\d*/);
//             timerAndType.textContent = 'Posted ' + (hoursAgo > 1 ? hoursAgo + 'hours ago · ' + type : hoursAgo + 'hour ago · ' + type); 
//         }
//     } else if (daysAgo > 7) {
//         let weeksAgo = daysAgo / 7;
//         if (weeksAgo > 4) {
//             let monthsAgo = daysAgo / 7 / 4;
//             monthsAgo = monthsAgo.toString().match(/^\d*/);
//             timerAndType.textContent = 'Posted ' + (monthsAgo > 1 ? monthsAgo + 'months ago · ' + type : monthsAgo + 'month ago · ' + type); 
//         } else {
//             weeksAgo = weeksAgo.toString().match(/^\d*/);
//             timerAndType.textContent = 'Posted ' + (weeksAgo > 1 ? weeksAgo + 'weeks ago · ' + type : weeksAgo + 'week ago · ' + type); 
//         }
//     } else {
//         daysAgo = daysAgo.toString().match(/^\d*/);
//         console.log(daysAgo);
//         timerAndType.textContent = 'Posted ' + (daysAgo > 1 ? daysAgo + 'days ago · ' + type : daysAgo + 'day ago · ' + type); 
//     }
// }

function getTimeAgo(timer, timerAndType, type) {
    const now = Date.now();
    let timeAgo = now - timer;
    let timeUnit = '';
    let timeOneUnit = '';
    const day = 8.64e+7;
    const week = day * 7;
    const hour = 3.6e+6;
    let quantity;
    if (timeAgo / day > 1 && timeAgo / day < 8) {
        timeUnit = 'days';
        timeOneUnit = 'day';
        quantity = timeAgo / day ;
    } else if (timeAgo / day > 8) {
        timeUnit = 'weeks';
        timeOneUnit = 'week';
        quantity = timeAgo / week;
        if (quantity > 4) {
            timeUnit = 'months';
            timeOneUnit = 'month';
            quantity /= 4;
        }
    } else {
        timeUnit = 'hours';
        timeOneUnit = 'hour';
        quantity = timeAgo / hour;
    }
    quantity = quantity.toString().match(/^\d*/);
    timerAndType.textContent = 'Posted ' + (quantity > 1 ? quantity + timeUnit + ' ago · ' + type : quantity + timeOneUnit + ' ago · ' + type);
}

// Theme mode
const toggle = document.querySelector('.toggle input');

document.addEventListener("DOMContentLoaded", function() {
    loader.style.display = "none"
    let theme = window.localStorage.getItem('data-theme');
    console.log(theme);
    document.documentElement.setAttribute("data-theme", theme);
    theme === "dark-mode" ? toggle.checked = true : toggle.checked = false ;
    toggle.addEventListener('click', () => {
        console.log(toggle.checked)
        theme = window.localStorage.getItem('data-theme') === "dark-mode" ? "light" : "dark-mode";
        document.documentElement.setAttribute("data-theme", theme)
        window.localStorage.setItem('data-theme', theme)
    })
})

