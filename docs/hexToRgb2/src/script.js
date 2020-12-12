'use strict';
( () => {
  const handleRgbInput = () => {
    const vals = inputs.map( e => +e.value );
    if ( vals.every( e => e < 256 && e >= 0 ) ) {
      const hex = (
        ( vals[ 0 ] << 16 )
        | ( vals[ 1 ] << 8 )
        | vals[ 2 ] )
        .toString( 16 )
        .toLowerCase() // for me it would already be lowercase but just to be sure i call toLowerCase anyway
        .padStart(
          6,
          '0'
        );
      bodyStyle.backgroundColor = hexInput.value = `#${ hex }`;
      updateURL( hex );
    }
  };

  const validLengths = [ 3, 6 ];
  const handleHexInput = ( e = {} ) => {
    const isPopstate = typeof e.type === 'string' && e.type === 'popstate';

    if ( isPopstate ) {
      const url = new URL( location );
      const hex = url.searchParams.get( 'hex' );
      if ( typeof hex === 'string' ) {
        hexInput.value = `#${ hex }`;
      }
    }
    let val = hexInput.value.trim().match( /[a-f0-9]+$/i );
    if ( val !== null ) {
      val = val[ 0 ];
    }
    if ( typeof val === 'string' && validLengths.includes( val.length ) ) {
      if ( val.length === 3 ) {
        val = val
          .split( '' )
          .map( e => e + e )
          .join( '' );
      }
      bodyStyle.backgroundColor = `#${ val }`;

      if ( isPopstate === false ) {
        updateURL( val );
      }

      val = parseInt(
        val,
        16
      );

      for ( let i = inputs.length - 1; i >= 0; --i ) {
        inputs[ i ].value = val & 255;
        val >>= 8;
      }
    }
  };

  const randomise = () => {
    for ( let i = 0; i < inputs.length; ++i ) {
      inputs[ i ].value = Math.floor( Math.random() * 256 );
    }
    handleRgbInput();
  };

  const updateURL = hex => {
    const url = new URL( location );
    url.searchParams.set(
      'hex',
      hex
    );
    history.pushState(
      {},
      '',
      url
    );
  };

  const increase = e => {
    if ( e.target.nodeName === 'INPUT' ) {
      const newVal = +e.target.value + ( e.deltaY < 0
        ? 1
        : -1 );
      e.target.value = newVal > 255
        ? 255
        : newVal < 0
          ? 0
          : newVal;

      handleRgbInput();

      e.preventDefault();
      e.stopImmediatePropagation();
    }
  };

  const inputs = [
    ...document.getElementById( 'rgb' ).getElementsByTagName( 'input' ),
  ];

  const hexInput = document.querySelector( '#hex > input' );
  const bodyStyle = document.body.style;

  const hex = new URL( location ).searchParams.get( 'hex' );
  if ( typeof hex === 'string' ) {
    hexInput.value = `#${ hex.toLowerCase() }`;
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

  document.getElementById( 'rgb' ).addEventListener(
    'wheel',
    increase
  );
  document.getElementById( 'rand' ).addEventListener(
    'click',
    randomise
  );

  addEventListener(
    'popstate',
    handleHexInput
    // updates input and then updates rgb inputs directly
  );
} )();
