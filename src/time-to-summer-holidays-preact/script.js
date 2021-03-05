const { render, Component, h } = require( 'preact' );

( () => {
  const themeToggle = document.querySelector( '#theme-toggle' );
  themeToggle.addEventListener(
    'change',
    () => {
      document.body.classList[ themeToggle.checked
        ? 'remove'
        : 'add' ]( 'light' );
    }
  );

  const themeShouldBeDark = matchMedia
    ? matchMedia( '(prefers-color-scheme: dark)' ).matches
    : true;
  document.body.classList[ themeShouldBeDark
    ? 'remove'
    : 'add' ]( 'light' );
  themeToggle.checked = themeShouldBeDark;

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

  const root = document.querySelector( '#root' );

  class Root extends Component {
    render() {
      const { state } = this;
      return <div>
        <span>{ state.days }</span>
        { ' days, ' }
        <span>{ state.hours }</span>
        { ' hours, ' }
        <span>{ state.minutes }</span>
        { ' minutes and ' }
        <span>{ state.seconds }</span>
        { ' seconds to ' }
        <span>summer holidays</span>
      </div>;
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
      const hours = `${ Math.floor( ( totalSeconds / ( 60 * 60 ) ) % 24 ) }`.padStart(
        2,
        '0'
      );
      const days = Math.floor( totalSeconds / ( 60 * 60 * 24 ) );

      this.setState( { seconds, minutes, hours, days } );

      requestAnimationFrame( this.update.bind( this ) );
    }
  }
  render(
    <Root />,
    root,
    root.firstElementChild
  );
} )();
