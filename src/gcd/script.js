import { render, h, Component, createRef } from 'preact';
import { gcdArray } from './functions.js';

( () => {
  const root = document.querySelector( '#root' );

  class App extends Component {
    state = {};

    inputRef = createRef();

    timeout = 0;

    gcdArraySetState = gcdArray( this.setState.bind( this ) );

    clearTimeout = () => {
      clearTimeout( this.timeout );
    };

    setTimeout = arguments_ => {
      this.clearTimeout();

      this.timeout = setTimeout(
        this.gcdArraySetState,
        100,
        arguments_
      );
    };

    render = (
      _properties, { inputValue, outputValue, tooLarge }
    ) => <div class="box">
      <input
        onInput={this.handleInput}
        ref={this.inputRef}
        placeholder="2, 5, 9-13"
      />
      <div>Parsed input:</div>
      <div>
        {( inputValue
            && ( tooLarge
              ? 'One or more numbers were too large'
              : inputValue ) )
            || 'Enter some numbers'}
      </div>
      <hr />
      <div>gcd:</div>
      <div>
        {( outputValue
            && ( tooLarge
              ? 'One or more numbers were too large'
              : outputValue ) )
            || 'Enter some numbers'}
      </div>
    </div>
    ;

    handleInput = () => {
      const originalValue = this.inputRef.current.value;
      let mutatingValue = originalValue;

      console.log( mutatingValue );

      mutatingValue = mutatingValue
        // Since fullstops aren't allowed just turn them into commas
        .replace(
          /\./g,
          ','
        )
        // Remove non-necessary characters
        .replace(
          /[^\d,-]/g,
          ''
        )
        .split( ',' )
        .filter( currentValue => currentValue.trim() !== '' );
      const newVals = [];

      // Turn 4-10 into [4,5,6,7,8,9,10]
      for ( const item of mutatingValue ) {
        if ( ( /-?\d+-{1,2}\d+/ ).test( `${ item }` ) ) {
          let { firstNumber, secondNumber } = item.match( /(?<firstNumber>-?\d+)-(?<secondNumber>-?\d+)/ ).groups;
          firstNumber = Math.trunc( +firstNumber );
          secondNumber = Math.trunc( +secondNumber );

          const lower = Math.min(
            firstNumber,
            secondNumber
          );
          const upper = Math.max(
            firstNumber,
            secondNumber
          );

          for ( let index = lower; index <= upper; ++index ) {
            newVals.push( index );
          }
        }
        else {
          const newValue = Math.trunc( +item );
          if ( Number.isFinite( newValue ) ) {
            newVals.push( newValue );
          }
        }
      }

      if ( newVals.some( value => !Number.isSafeInteger( value ) ) ) {
        this.setState( {
          tooLarge: true,
        } );
      }
      else {
        newVals.sort( (
          a, b
        ) => a - b );

        const uniques = [ ...new Set( newVals ) ];

        this.setState( state => {
          const inputValue = uniques.join( ', ' );

          if ( inputValue !== state.inputValue ) {
            this.setTimeout( uniques );

            return { inputValue, tooLarge: false };
          }

          return {};
        } );
      }
    };
  }

  render(
    <App />,
    root
  );
} )();
