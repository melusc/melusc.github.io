/* eslint-disable class-methods-use-this */
import { render, Component, h } from 'https://esm.run/preact';

( () => {
  document.getElementById( 'theme-toggle' ).addEventListener(
    'change',
    () => {
      document.body.classList.toggle( 'light' );
    }
  );

  const summerHolidays = new Date(
    2021,
    6,
    8,
    14,
    40,
    0
  );
  summerHolidays.setUTCHours( 12 );

  const summerHolidaysTime = summerHolidays.getTime();

  const root = document.getElementById( 'root' );

  class Root extends Component {
    render() {
      return h(
        'div',
        null,
        h(
          'span',
          null,
          this.state.days
        ),
        ' days, ',
        h(
          'span',
          null,
          this.state.hours
        ),
        ' hours, ',
        h(
          'span',
          null,
          this.state.minutes
        ),
        ' minutes and ',
        h(
          'span',
          null,
          this.state.seconds
        ),
        ' seconds to ',
        h(
          'span',
          null,
          'summer holidays'
        )
      );
    }

    componentDidMount() {
      this.update();
      requestAnimationFrame( this.update.bind( this ) );
    }

    update() {
      const totalSeconds = ( +summerHolidaysTime - Date.now() ) / 1000;

      const seconds = `${ Math.floor( totalSeconds % 60 ) }`.padStart(
        2,
        '0'
      );
      const minutes = `${ Math.floor( ( totalSeconds / 60 ) % 60 ) }`.padStart(
        2,
        '0'
      );
      const hours = `${ Math.floor( ( totalSeconds / 60 / 60 ) % 24 ) }`.padStart(
        2,
        '0'
      );
      const days = Math.floor( totalSeconds / 60 / 60 / 24 );

      this.setState( { seconds, minutes, hours, days } );

      requestAnimationFrame( this.update.bind( this ) );
    }
  }
  render(
    h( Root ),
    root,
    root.firstElementChild
  );
} )();
