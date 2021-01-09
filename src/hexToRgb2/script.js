'use strict'; // eslint-disable-line strict

( () => {
  let hashUpdatedByScript = false;
  /* keep track of updates to hash
    when the hash updates from the user going
    back or forward in browser history
    this will be false and the script will update the input

    but if the script updates the hash because
    the user updated the input this will be true
    and the input will not be updated again
  */

  const handleRgbInput = () => {
    const vals = inputs.map( e => +e.value );
    if ( vals.every( e => e < 256 && e > 0 ) ) {
      const newVal = `#${ (
        (
          vals[ 0 ] << 16 )
          | ( vals[ 1 ] << 8 )
          | vals[ 2 ]
      )
        .toString( 16 )
        .toLowerCase() // it seems to always be lowercase but just to be sure
        .padStart(
          6,
          '0'
        ) }`;

      updateURL( bodyStyle.backgroundColor = hexInput.value = newVal );
    }
  };

  const validLengths = { 3: true, 6: true };
  const handleHexInput = ( e = {} ) => {
    const isHashChange = e.type === 'hashchange';
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
    let val = hexInput.value.trim().match( /^#(?<val>[a-f0-9]+)$/i )?.groups?.val;

    if ( typeof val === 'string' && validLengths[ val.length ] ) {
      if ( val.length === 3 ) {
        val = val
          .split( '' )
          .map( e => e + e )
          .join( '' );
      }
      bodyStyle.backgroundColor = `#${ val }`;

      if ( !isHashChange ) {
        updateURL( val );
      }

      val = parseInt(
        val,
        16
      );

      for ( let i = 2; i >= 0; --i ) {
        inputs[ i ].value = val & 255;
        val >>= 8;
      }
    }
  };

  const randomise = () => {
    // uint8 so [0, 255]
    crypto.getRandomValues( new Uint8Array( 3 ) ).forEach( (
      randVal, idx
    ) => {
      inputs[ idx ].value = randVal;
    } );
    handleRgbInput();
  };

  const updateURL = hex => {
    location.hash = hex;
    hashUpdatedByScript = true;
  };

  const handleScroll = e => {
    if ( e.target.nodeName === 'INPUT' ) {
      const newVal = +e.target.value - Math.sign( e.deltaY );
      /* negative because it is more intuitive
       where scrolling up increases,
       scrolling down decreases */

      e.target.value = newVal > 255
        ? 255
        : newVal < 0
          ? 0
          : newVal; // limit to [0, 255]

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

  document.getElementById( 'hex' ).addEventListener(
    'input',
    handleHexInput
  );

  document.getElementById( 'rgb' ).addEventListener(
    'input',
    handleRgbInput
  );

  document
    .getElementById( 'rgb' )
    .addEventListener(
      'wheel',
      handleScroll,
      { passive: true }
    );
  document.getElementById( 'rand' ).addEventListener(
    'click',
    randomise
  );

  addEventListener(
    'hashchange',
    handleHexInput
    // updates input and then updates rgb inputs directly
  );
} )();
