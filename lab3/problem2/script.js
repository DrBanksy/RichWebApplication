const { Observable, fromEvent } = rxjs;

const startButtonObserv = rxjs.fromEvent(start, 'click');

countdown$ = startButtonObserv.subscribe(() => {
	alert('test');
});