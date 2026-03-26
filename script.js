// let winWidth,
// block = document.querySelector('.links');
// terms = document.querySelector('.terms');
// policy = document.querySelector('.privacy');

// function hide() {
// 	winWidth = window.innerWidth;
// 	console.log(winWidth);
// 	if (winWidth > 430) {
// 		block.classList.remove('hide');
// 		terms.classList.add('hide');
// 		policy.classList.add('hide');
// 	}

// 	else {
// 		block.classList.add('hide');
// 		terms.classList.remove('hide');
// 		policy.classList.remove('hide');		
// 	}
// }




// hide();
// window.addEventListener('scroll', hide);


// function ibg() {

// 	let ibg = document.querySelectorAll("._ibg");
// 	for (var i = 0; i < ibg.length; i++) {
// 		if (ibg[i].querySelector('img')) {
// 			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
// 		}
// 	}
// }

// ibg();

let title = document.querySelector('.page__title');
let titleText = title.innerHTML;
// let date = new Date();
// let dateYear = date.getFullYear();
// let dateMonth = date.getMonth();
// let dateDay = date.getDate();
let monthArray = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

var today = new Date();
var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000)); // Ð¿Ñ€Ð¸Ð±Ð°Ð²Ð»ÑÐµÐ¼ ÑÑƒÑ‚ÐºÐ¸
var dayTomorrow = tomorrow.getDate(); 
var monthTomorrow = tomorrow.getMonth(); //Ð² js Ð¼ÐµÑÑÑ† Ð¾Ñ‚ÑÑ‡Ð¸Ñ‚Ñ‹Ð²Ð°ÐµÑ‚ÑÑ Ñ Ð½ÑƒÐ»Ñ
var yearTomorrow = tomorrow.getFullYear(); 

// console.log(dateYear);
// console.log(dateMonth);
// console.log(dateDay);
// console.log(monthArray[dateMonth]);
// console.log(`${monthArray[dateMonth]} ${dateDay + 1}, ${dateYear}`);
title.innerHTML = `${titleText}  ${dayTomorrow}. ${monthArray[monthTomorrow]}`;
// let min = 75;
// let max = 92;
// let percent = Math.floor(Math.random() * (max - min + 1) + min);
// console.log(percent);
// let claimed = document.querySelector('.claimed');
// claimed.innerHTML = percent;
// let progress = document.querySelector('.progress-bar-success');
// progress.style.width = percent + '%';





// let min = 75;
// let max = 92;
// let percent = Math.floor(Math.random() * (max - min + 1) + min);
// console.log(percent);
// let claimed = document.querySelector('.claimed');
// claimed.innerHTML = percent;
// let progress = document.querySelector('.progress-bar-success');
// progress.style.width = percent + '%';




function waitOn() {
    let text = "wait"
    let pointCount = 0
    var i = setInterval(function () {
        var newText = text
        for (let i = 0; i <= pointCount; i++) {
            newText += "."
        }
        document.getElementById("startBtn").text = newText;
        pointCount++
        if (pointCount > 2) {
            pointCount = 0
        }
    }, 200);
}

function waitOn2() {
    let text = "wait"
    let pointCount = 0
    var i = setInterval(function () {
        var newText = text
        for (let i = 0; i <= pointCount; i++) {
            newText += "."
        }
        document.getElementById("startBtn2").text = newText;
        pointCount++
        if (pointCount > 2) {
            pointCount = 0
        }
    }, 200);
}
