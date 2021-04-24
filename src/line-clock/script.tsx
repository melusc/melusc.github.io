'use strict'; // eslint-disable-line strict

import 'preact/devtools';

import { render, h, Component } from 'preact';

type AppState = {
  hour1: number;
  hour2: number;
  min1: number;
  min2: number;
  sec1: number;
  sec2: number;
};

type RangeProperties = {
  to: number;
  active: number;
};

const leadingZero = ( n: number ): string => `${ n }`.padStart(
  2,
  '0'
);

const ClockLine = ( { to, active }: RangeProperties ) => (
  <div class={`clock-row active-child-${ active }`}>
    {Array.from(
      { length: to + 1 },
      (
        _v, index
      ) => (
        <div
          key={index} class={active === index
            ? 'active'
            : undefined}>
          {index}
        </div>
      )
    )}
  </div>
);
class App extends Component {
  state: AppState = {
    hour1: 0,
    hour2: 0,
    min1: 0,
    min2: 0,
    sec1: 0,
    sec2: 0,
  };

  render = (
    _properties: unknown,
    { hour1, hour2, min1, min2, sec1, sec2 }: AppState
  ) => (
    <div class="clock">
      <ClockLine to={2} active={hour1} />
      <ClockLine to={9} active={hour2} />
      <div class="colon">:</div>
      <ClockLine to={5} active={min1} />
      <ClockLine to={9} active={min2} />
      <div class="colon">:</div>
      <ClockLine to={5} active={sec1} />
      <ClockLine to={9} active={sec2} />
    </div>
  );

  componentDidMount = () => {
    this.update();
  };

  update = () => {
    const date = new Date();
    const hour = leadingZero( date.getHours() );
    const min = leadingZero( date.getMinutes() );
    const sec = leadingZero( date.getSeconds() );

    const [ hour1, hour2 ] = hour.split( '' );
    const [ min1, min2 ] = min.split( '' );
    const [ sec1, sec2 ] = sec.split( '' );

    this.setState( {
      hour1: +hour1,
      hour2: +hour2,
      min1: +min1,
      min2: +min2,
      sec1: +sec1,
      sec2: +sec2,
    } as AppState );

    requestAnimationFrame( this.update );
  };
}

const root = document.querySelector( '#root' );

if ( root ) {
  render(
    <App />,
    root
  );
}
