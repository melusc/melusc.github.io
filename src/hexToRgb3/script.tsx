import hexRgb from 'hex-rgb';
import rgbHex from 'rgb-hex';

import { render, h, Component } from 'preact';
import { produce } from 'immer';
import clsx from 'clsx';

type Inputs = {
  hex: string;
  red: string;
  green: string;
  blue: string;
  alpha: string;
};

type AppState = {
  inputs: Inputs;
};

type RgbaLabels = 'red' | 'green' | 'blue' | 'alpha';

const sanitiseHex = (
  hex: string, shouldShorten = true
): string => {
  hex = hex.trim();

  // Remove leading "#"
  hex = `#${ hex }`.replace(
    /^#+/g,
    ''
  );

  let shortFormPossible
    = shouldShorten && ( hex.length === 8 || hex.length === 6 );
  let shortForm = '';
  for ( let index = 0; index < hex.length && shortFormPossible; index += 2 ) {
    if ( hex[ index ] === hex[ index + 1 ] ) {
      shortForm += hex[ index ];
    }
    else {
      shortFormPossible = false;
      break;
    }
  }

  return `#${ shortFormPossible
    ? shortForm
    : hex }`;
};

const rgbaLabels: ReadonlySet<RgbaLabels> = new Set( [
  'red',
  'green',
  'blue',
  'alpha',
] );

class App extends Component {
  state: AppState = {
    inputs: {
      hex: '',
      red: '',
      green: '',
      blue: '',
      alpha: '',
    },
  };

  invalidInputs = new Set<keyof Inputs>();

  render = () => {
    const { invalidInputs, state, randomColour, handleInput } = this;
    const { inputs } = state;
    const { hex, alpha } = inputs;
    const labels: Array<keyof Inputs> = [ 'red', 'green', 'blue' ];

    return (
      <div
        class="horizontal-vertical-center"
        style={{
          backgroundColor: hex,
        }}
      >
        <div class="inner">
          <div class="row">
            <div>
              <label class="block">Hex</label>
              <input
                maxLength={9}
                value={hex}
                placeholder="#"
                onInput={this.handleInput( 'hex' )}
                class={clsx( {
                  invalid: invalidInputs.has( 'hex' ),
                } )}
              />
            </div>
          </div>

          <div class="row">
            <div class="rgb-rows">
              <label class="block">Rgb[a]</label>
              {labels.map( key => (
                <input
                  type="tel"
                  min="0"
                  max="255"
                  maxLength={3}
                  placeholder={key}
                  value={inputs[ key ]}
                  key={key}
                  onInput={handleInput( key )}
                  class={clsx( {
                    invalid: invalidInputs.has( key ),
                  } )}
                />
              ) )}
              <input
                type="tel"
                min="0"
                max="100"
                placeholder="[alpha]"
                value={alpha}
                onInput={handleInput( 'alpha' )}
                class={clsx( {
                  invalid: invalidInputs.has( 'alpha' ),
                } )}
              />
            </div>
          </div>
          <div class="row">
            <div class="rainbow-text-outer">
              <div class="rainbow-text" onClick={randomColour}>
                Random colour
              </div>
              <div class="rainbow" />
              <div class="rainbow2" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  componentDidMount = () => {
    addEventListener(
      'hashchange',
      this.handleHashChange
    );

    // If there is already a hash
    // it will be filled in this way
    this.handleHashChange();
  };

  componentWillUnmount = () => {
    removeEventListener(
      'hashchange',
      this.handleHashChange
    );
  };

  handleHashChange = () => {
    let hex = location.hash;
    hex = sanitiseHex( hex );

    try {
      const rgba = hexRgb( hex );

      this.rgbaSetState( rgba );

      // Only set it here because if it gets to
      // here it was a valid hex
      this.setHash( hex );
      this.hexSetState( hex );
    }
    catch {
      this.randomColour();
    }
  };

  setHash = ( hex: string ) => {
    hex = sanitiseHex( hex );

    if ( hex !== location.hash ) {
      /*
        https://developer.mozilla.org/en-US/docs/Web/API/History/pushState#description
        -> history.pushState doesn't fire hashchange

        Alternative would be storing current hex and location.hash and
        when setHash updates the hash, the stored hex and hash will be the same
        and if the user goes back in history the stored hex and hash will not be the same
      */
      history.pushState(
        {},
        '',
        hex
      );
    }
  };

  randomColour = () => {
    const [ red, blue, green ] = crypto.getRandomValues( new Uint8Array( 3 ) );

    this.rgbaSetState( {
      red,
      blue,
      green,
      alpha: 1,
    } );

    let hex = rgbHex(
      red,
      green,
      blue
    );

    hex = sanitiseHex( hex );

    this.setHash( hex );

    this.hexSetState( hex );
  };

  rgbaSetState = ( rgba: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  } ) => {
    this.setState( produce( ( state: AppState ) => {
      const { inputs } = state;

      for ( const key of rgbaLabels ) {
        const value = rgba[ key ];

        inputs[ key ] = value.toFixed( Number.isInteger( value )
          ? 0
          : 2 );
      }

      return state;
    } ) );
  };

  /**
   * It is the caller's responsibility to sanitise the passed
   * value because maybe the hex shouldn't be shortened
   * or even sanitised
   *
   * @param {string} hex The hex value to update the state with
   *
   * @return {void}
   */
  hexSetState = ( hex: string ) => {
    this.setState( produce( ( state: AppState ) => {
      state.inputs.hex = hex;
    } ) );
  };

  handleHexInput = ( hex: string ) => {
    const { invalidInputs } = this;

    hex = sanitiseHex(
      hex,
      false
    );

    this.hexSetState( hex );

    try {
      const rgba = hexRgb( hex );

      this.setHash( hex );
      // Only if the hex was valid (calling hexRgb)

      invalidInputs.delete( 'hex' );

      this.rgbaSetState( rgba );
    }
    catch {
      invalidInputs.add( 'hex' );
      this.forceUpdate();
      // Force update because invalidInputs won't by itself
    }
  };

  handleRgbaInput = (
    label: RgbaLabels, value: string
  ) => {
    const { invalidInputs } = this;

    this.setState( produce( ( state: AppState ) => {
      const { inputs } = state;

      inputs[ label ] = value;

      // The next few lines because if alpha is '', '1' or '100%'
      // we want a 6-digit instead
      // and we can achieve that by passing undefined

      let alpha: string | undefined = inputs.alpha;
      if ( [ '1', '100%', '' ].includes( alpha ) ) {
        alpha = undefined;
      }

      try {
        let hex = rgbHex(
          +inputs.red,
          +inputs.green,
          +inputs.blue,
          alpha
        );

        hex = sanitiseHex( hex );

        inputs.hex = hex;

        this.setHash( inputs.hex );

        for ( const label of rgbaLabels ) {
          invalidInputs.delete( label );
        }

        invalidInputs.delete( 'hex' );
      }
      catch {
        invalidInputs.add( label );
        // No forceUpdate, will trigger after immer is done
      }
    } ) );
  };

  handleInput =
  ( label: keyof Inputs ): h.JSX.GenericEventHandler<HTMLInputElement> => event_ => {
    if ( event_.target ) {
      const value = event_.currentTarget.value.trim();

      if ( label === 'hex' ) {
        this.handleHexInput( value );
      }
      else if ( rgbaLabels.has( label ) ) {
        this.handleRgbaInput(
          label,
          value
        );
      }
    }
  };
}

const root = document.querySelector<HTMLDivElement>( '#root' );
if ( root ) {
  render(
    <App />,
    root
  );
}
