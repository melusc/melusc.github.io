{
  const summerDate = new Date('07/08/2021 14:40:00 GMT+0200'); // MM/DD/YYYY ...

  const setTime = () => {
    const totalSeconds = (summerDate.getTime() - Date.now()) / 1000;

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    setText({
      id: 'days',
      val: days,
      text: 'day',
      leadingZero: false,
    });
    setText({
      id: 'hours',
      val: hours,
      text: 'hour',
    });
    setText({
      id: 'minutes',
      val: minutes,
      text: 'minute',
    });
    setText({
      id: 'seconds',
      val: seconds,
      text: 'second',
    });

    const dateZeroMilliSeconds = new Date();
    dateZeroMilliSeconds.setSeconds(dateZeroMilliSeconds.getSeconds() + 1, 0);
    setTimeout(() => {
      setTime();
    }, dateZeroMilliSeconds.getTime() - Date.now());
  };

  const setText = ({ id, val, text, leadingZero }) => {
    leadingZero = leadingZero ?? true;

    const el = document.getElementById(id);
    const string = leadingZero ? ('0' + val).slice(-2) : '' + val;

    if (el.textContent !== string) {
      el.textContent = string;

      const display = text + (val === 1 ? '' : 's');
      const displayEl = document.getElementById(id + 'Display');

      displayEl.textContent = display === false ? '' : display;
    }
  };

  setTime();

  const dateZeroMilliSeconds = new Date();
  dateZeroMilliSeconds.setSeconds(dateZeroMilliSeconds.getSeconds() + 1, 0);
  // run always at 0 ms ( is off by a bit though due to slight inaccuracies )

  setTimeout(() => {
    setTime();
  }, dateZeroMilliSeconds.getTime() - Date.now());
}
