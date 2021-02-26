import { render, h, Component } from 'https://esm.run/preact';

const init = () => {
  const root = document.querySelector( '#root' );

  render(
    <App />,
    root
  );
};

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
    _props, { hour1, hour2, min1, min2, sec1, sec2 }
  ) => <div class="clock">
    <Range to={2} active={hour1} rowName="hour1" />
    <Range to={9} active={hour2} rowName="hour2" />
    <div class="colon1">:</div>
    <Range to={5} active={min1} rowName="min1" />
    <Range to={9} active={min2} rowName="min2" />
    <div class="colon2">:</div>
    <Range to={5} active={sec1} rowName="sec1" />
    <Range to={9} active={sec2} rowName="sec2" />
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

const Range = ( { to, active, rowName } ) => <div class={`clock-row active-child-${ active }${ rowName
  ? ` ${ rowName }`
  : '' }`}>
  {Array.from(
    { length: to + 1 },
    (
      _, i
    ) => <div key={i} class={active === i && 'active'}>
      {i}
    </div>
  )}
</div>;
init();
