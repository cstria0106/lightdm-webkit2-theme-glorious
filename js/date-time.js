class DateTime {
	constructor() {
		this._localStorage = window.localStorage;
		this._sidebarClock = document.querySelector('#user-profile-clock');
		this._sidebarDate = document.querySelector('#user-profile-date');
		this._greeterMessage = document.querySelector('#greeter-message');
		this._greeterClock = document.querySelector('#greeter-clock');
		this._greeterDate = document.querySelector('#greeter-date');
		this._setTime = this._setTime.bind(this);
		this._twentyFourMode = false;
		this._clockUpdater = null;

		this._daysArr = [
			'일',
			'월',
			'화',
			'수',
			'목',
			'금',
			'토'
		];

		this._init();
	}

	// Append zero
	_appendZero(k) {
		// Append 0 before time elements if less hour's than 10
		if (k < 10) {
			return '0' + k;
		} else {
			return k;
		}
	}

	_setTime() {
		const date = new Date();
		let hour = date.getHours();
		let min = date.getMinutes();
		let midDay = null;
		let greeterSuffix = null;
		min = this._appendZero(min);

		greeterSuffix = '안녕하세요!';

		// 24-hour mode
		if (this._twentyFourMode === true) {
			hour = this._appendZero(hour);
			this._sidebarClock.innerText = `${hour}:${min}`;
			this._greeterClock.innerText = `${hour}:${min}`;
		} else {
			// 12-hour mode
			midDay = (hour >= 12) ? 'PM' : 'AM';
			hour = (hour === 0) ? 12 : ((hour > 12) ? this._appendZero(hour - 12) : this._appendZero(hour));
			this._sidebarClock.innerText = `${hour}:${min} ${midDay}`;
			this._greeterClock.innerText = `${hour}:${min} ${midDay}`;
		}

		this._sidebarDate.innerText = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 ${this._daysArr[date.getDay()]}요일`
		this._greeterDate.innerText = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 ${this._daysArr[date.getDay()]}요일`

		this._greeterMessage.innerText = `${greeterSuffix}`;
	}

	_startClock() {
		this._setTime();
		this._clockUpdater = setInterval(this._setTime, 1000);
	}

	_updateClockMode() {
		clearInterval(this._clockUpdater);
		this._twentyFourMode = !this._twentyFourMode;
		this._localStorage.setItem('twentyFourMode', JSON.stringify(this._twentyFourMode));
		this._startClock();
	}

	_clockClickEvent() {
		this._greeterClock.addEventListener(
			'click',
			() => {
				console.log('toggle 24-hour clock mode');
				this._updateClockMode();
			}
		);
		this._sidebarClock.addEventListener(
			'click',
			() => {
				console.log('toggle 24-hour clock mode');
				this._updateClockMode();
			}
		);
	}

	_init() {
		this._twentyFourMode = JSON.parse(this._localStorage.getItem('twentyFourMode')) || false;
		this._startClock();
		this._clockClickEvent();
	}
}
