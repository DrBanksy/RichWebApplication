const { Observable, fromEvent, interval, timer} = rxjs;
const { take, map, scan, takeWhile} = rxjs.operators;

const startButtonObserv = rxjs.fromEvent(start, 'click');

const displayCountdown = (totalseconds) => {
	const hours = document.getElementById('hoursCount');
	const minutes = document.getElementById('minutesCount');
	const seconds = document.getElementById('secondsCount');
	if(totalseconds <= 0) {
        console.log('test');
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

    //converting hours and minutes to seconds
    let totalSeconds = (hours.value * 60 * 60 * 1000) + (mins.value * 60 *1000) + (sec.value * 1000);
    totalSeconds = totalSeconds / 1000;

    // timer observable, every 1 second
    let countDownTimer = interval(1000).pipe(
    	take(totalSeconds),
		map((num) => totalSeconds - num))
    	.subscribe((totalSeconds) => {
            displayCountdown(totalSeconds);
        })
});

