const { Observable, fromEvent, interval, timer} = rxjs;
const { take, map, scan, takeWhile} = rxjs.operators;

const startButtonObserv = rxjs.fromEvent(start, 'click');

const displayCountdown = (totalseconds) => {
	const hours = document.getElementById('hoursCount');
	const minutes = document.getElementById('minutesCount');
	const seconds = document.getElementById('secondsCount');
	if(totalseconds <= 0) {
        resetTimer();
    } else {
    	hours.innerHTML = Math.floor(totalseconds / 3600);
        minutes.innerHTML = Math.floor(totalseconds % 3600 / 60);
        seconds.innerHTML = Math.floor(totalseconds % 3600 % 60);
        
    }
}

countDownTimer = startButtonObserv.subscribe(() => {
	// grab values from input
    const hours = document.getElementById('hour');
	const mins = document.getElementById('mins');
	const sec = document.getElementById('sec');
	const seconds = document.getElementById('secondsCount'); 

    //converting hours and minutes to seconds
    let totalSeconds = (hours.value * 60 * 60 * 1000) + (mins.value * 60 *1000) + (sec.value * 1000);
    totalSeconds = (totalSeconds / 1000);

    // timer observable, every 1 second
    let countDownTimer = interval(1000).pipe(
    	take(totalSeconds),
		map((num) => totalSeconds - num))
    	.subscribe((totalSeconds) => {
            displayCountdown(totalSeconds);
        })
});


const resetTimer = () => {
	//clear clock
	const hoursCount = document.getElementById('hoursCount');
	const minutesCount = document.getElementById('minutesCount');
	const secondsCount = document.getElementById('secondsCount');

	hoursCount.innerHTML = "0"
	minutesCount.innerHTML = "0";
	secondsCount.innerHTML = "0";

	//clear user input
	const userInputHr = document.getElementById('hour');
	const userInputMin = document.getElementById('mins');
	const userInputSec = document.getElementById('sec');

	userInputHr.value = "";
	userInputMin.value = "";
	userInputSec.value = "";


}
