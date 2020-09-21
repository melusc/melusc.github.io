'use strict';

{
  const summerDate = new Date( '07/08/2021 14:40:00 GMT+0200' ); // MM/DD/YYYY ...

  /**
   * Runs every second and sets a timeout until the next second by itself as that is more exact than intervals
   * @returns {void}
   */
  const setTime = () => {
    const totalSeconds = ( summerDate.getTime() - Date.now() ) / 1000;

    const days = Math.floor( totalSeconds / ( 60 * 60 * 24 ) );
    const hours = Math.floor( ( totalSeconds % ( 60 * 60 * 24 ) ) / ( 60 * 60 ) );
    const minutes = Math.floor( ( totalSeconds % ( 60 * 60 ) ) / 60 );
    const seconds = Math.floor( totalSeconds % 60 );

    /* If for example minutes doesn't changehours can't have changed either */
    setText( {
      id: 'seconds',
      val: seconds,
      text: 'second',
    } )
    && setText( {
      id: 'minutes',
      val: minutes,
      text: 'minute',
    } )
    && setText( {
      id: 'hours',
      val: hours,
      text: 'hour',
    } )
    && setText( {
      id: 'days',
      val: days,
      text: 'day',
      leadingZero: false,
    } );

    /*
     * Gets current date,
     * sets date to 1 second in the futur, at 0ms
     * and sets a timeout until then
     */
    const dateZeroMilliSeconds = new Date();
    dateZeroMilliSeconds.setSeconds(
      dateZeroMilliSeconds.getSeconds() + 1,
      0
    );
    setTimeout(
      setTime,
      dateZeroMilliSeconds.getTime() - Date.now()
    );
  };

  /**
   * Automatically updates the right span with the new values
   * @param {object} object0 All the values
   * @param {string} object0.id The id of the span
   * @param {string|number} object0.val The value to fill the span with
   * @param {string} object0.text The value the name of the value (minute/hour), adds an "s" to the end if object.val isn't 1
   * @param {boolean} [object0.leadingZero=true] Pad the number to two digits with a leading zero, disable by setting to false
   * @returns {boolean} True means the value has changed
   */
  const setText = ( { id, val, text, leadingZero } ) => {
    const el = document.getElementById( id );
    const string = leadingZero ?? true
      ? `0${ val }`.slice( -2 )
      : `${ val }`;

    if ( el.textContent !== string ) {
      el.textContent = string;

      const display = text + ( val === 1
        ? ''
        : 's' );
      const displayEl = document.getElementById( `${ id }Display` );

      displayEl.textContent = display === false
        ? ''
        : display;

      return true;
    }
    return false;
  };

  setTime();
}
