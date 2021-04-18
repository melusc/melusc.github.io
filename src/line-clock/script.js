const { render, h, Component } = require( 'preact' );

const Range = ( { to, active } ) => <div class={`clock-row active-child-${ active }`}>
  {Array.from(
    { length: to + 1 },
    (
      _, index
    ) => <div key={index} class={active === index && 'active'}>
      {index}
    </div>
  )}
</div>;
class App extends Component {
  state = {
    hour1: 0,
    hour2: 0,
    min1: 0,
    min2: 0,
    sec1: 0,
    sec2: 0,
  };

  render = (
    _properties, { hour1, hour2, min1, min2, sec1, sec2 }
  ) => <div class="clock">
    <Range to={2} active={hour1} />
    <Range to={9} active={hour2} />
    <div class="colon">:</div>
    <Range to={5} active={min1} />
    <Range to={9} active={min2} />
    <div class="colon">:</div>
    <Range to={5} active={sec1} />
    <Range to={9} active={sec2} />
  </div>
  ;

  componentDidMount = () => {
    this.update();
  };

  update = () => {
    const date = new Date();
    const hour = `${ date.getHours() }`.padStart(
      2,
      '0'
    );
    const min = `${ date.getMinutes() }`.padStart(
      2,
      '0'
    );
    const sec = `${ date.getSeconds() }`.padStart(
      2,
      '0'
    );

    this.setState( {
      hour1: +hour.charAt( 0 ),
      hour2: +hour.charAt( 1 ),
      min1: +min.charAt( 0 ),
      min2: +min.charAt( 1 ),
      sec1: +sec.charAt( 0 ),
      sec2: +sec.charAt( 1 ),
    } );

    requestAnimationFrame( this.update );
  };
}

const root = document.querySelector( '#root' );

render(
  <App />,
  root
);
