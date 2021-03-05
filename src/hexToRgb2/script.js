'use strict'; // eslint-disable-line strict

( () => {
  let hashUpdatedByScript = false;
  /* Keep track of updates to hash
    when the hash updates from the user going
    back or forward in browser history
    this will be false and the script will update the input

    but if the script updates the hash because
    the user updated the input this will be true
    and the input will not be updated again
  */

  const handleRgbInput = () => {
    const vals = inputs.map( value => +value.value );
    if ( vals.every( value => value < 256 && value >= 0 ) ) {
      let newValue = (
        (
          vals[ 0 ] << 16 )
          | ( vals[ 1 ] << 8 )
          | vals[ 2 ]
      )
        .toString( 16 )
        .toLowerCase() // It seems to always be lowercase but just to be sure
        .padStart(
          6,
          '0'
        );

      if ( ( /(?:(?<first>\w)\1){3}/ ).test( newValue ) ) {
        newValue = newValue.replace(
          /(?<first>\w)\1/g, // We already know it's only [a-f0-9]
          '$1'
        );
      }

      const hex = `#${ newValue }`;
      hexInput.value = hex;
      bodyStyle.backgroundColor = hex;

      updateURL( hex );
    }
  };

  const validLengths = new Set( [ 3, 6 ] );
  const handleHexInput = ( event_ = {} ) => {
    const isHashChange = event_.type === 'hashchange';
    if ( isHashChange ) {
      if ( hashUpdatedByScript ) {
        hashUpdatedByScript = false;
      }
      else {
        const { hash } = location;
        if ( hash && typeof hash === 'string' && hexInput.value !== hash ) {
          /* Updates to hexInput update the hash so only run
          this section if the change actually changes something
          because otherwise just entering the first three chars
          will turn #rgb to #rrggbb in the input itself which can
          be annoying if you have to delete the added unwanted chars
        */
          hexInput.value = hash;
        }
      }
    }

    const origValue = hexInput.value.trim().match( /^#?(?<val>[\da-f]+)$/i )?.groups?.val;

    if ( typeof origValue === 'string' && validLengths.has( origValue.length ) ) {
      let properLengthValue = origValue;
      if ( properLengthValue.length === 3 ) {
        properLengthValue = properLengthValue.replace(
          /\w/g, // We already know it's only [a-fA-F0-9]
          '$&$&'
        );
      }

      bodyStyle.backgroundColor = `#${ origValue }`;

      if ( !isHashChange ) {
        updateURL( origValue );
      }

      let parsedValue = Number.parseInt(
        properLengthValue,
        16
      );

      for ( let index = 2; index >= 0; --index ) {
        inputs[ index ].value = parsedValue & 255;
        parsedValue >>= 8;
      }
    }
  };

  const randomise = () => {
    // Uint8 so [0, 255]
    for ( const [ index, randValue ] of crypto.getRandomValues( new Uint8Array( 3 ) ).entries() ) {
      inputs[ index ].value = randValue;
    }

    handleRgbInput();
  };

  const updateURL = hex => {
    location.hash = hex;
    hashUpdatedByScript = true;
  };

  const handleScroll = event_ => {
    if ( event_.target.nodeName === 'INPUT' ) {
      const newValue = +event_.target.value - Math.sign( event_.deltaY );
      /* Negative because it is more intuitive
       where scrolling up increases,
       scrolling down decreases */

      event_.target.value = newValue > 255
        ? 255
        : newValue < 0
          ? 0
          : newValue; // Limit to [0, 255]

      handleRgbInput();
    }
  };

  const inputs = [ ...document.querySelectorAll( '#rgb > input' ) ];

  const hexInput = document.querySelector( '#hex > input' );
  const bodyStyle = document.body.style;

  const hex = location.hash;
  if ( hex.length > 1 ) {
    hexInput.value = hex.toLowerCase();
    handleHexInput();
  }
  else {
    randomise();
  }

  document.querySelector( '#hex' ).addEventListener(
    'input',
    handleHexInput
  );

  const rgbInputs = document.querySelector( '#rgb' );

  rgbInputs.addEventListener(
    'input',
    handleRgbInput
  );

  rgbInputs
    .addEventListener(
      'wheel',
      handleScroll,
      { passive: true }
    );
  document.querySelector( '#rand' ).addEventListener(
    'click',
    randomise
  );

  addEventListener(
    'hashchange',
    handleHexInput
    // Updates input and then updates rgb inputs directly
  );
} )();
