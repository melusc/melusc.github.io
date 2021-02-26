import json5 from 'https://esm.run/json5@2.2.0';

( () => {
  const input = document.getElementById( 'input' );
  const output = document.getElementById( 'output' );
  const prettyPrintInput = document.getElementById( 'pretty' );
  const indent = document.getElementById( 'indent' );
  const errorDiv = document.getElementById( 'errors' );
  const indentWrapper = document.getElementById( 'indent-wrapper' );
  const indentMax = +indent.max;
  const indentMin = +indent.min;

  let shouldIndent;
  let amountIndent;

  const updateVals = () => {
    shouldIndent = prettyPrintInput.checked;

    const indentValue = +indent.value;
    indent.value = amountIndent = indentValue > indentMax
      ? indentMax
      : indentValue < indentMin
        ? indentMax
        : indentValue;

    indent.disabled = !shouldIndent;
    indentWrapper.classList.toggle(
      'input-active',
      !shouldIndent
    );
  };
  updateVals();

  const updateFn = () => {
    updateVals();

    prettify();
  };

  const sortJSON = value => {
    if ( typeof value !== 'object' ) {
      return value;
    }
    if ( Array.isArray( value ) ) {
      return value.map( e => sortJSON( e ) );
    }

    const keys = Object.keys( value ).sort( (
      a, b
    ) => a.localeCompare(
      b,
      'en',
      {
        sensitivity: 'case',
        caseFirst: 'lower',
      }
    ) );

    const obj = {};

    for ( const key of keys ) {
      obj[ key ] = value[ key ];
    }
    return obj;
  };

  const prettify = () => {
    errorDiv.textContent = '';
    try {
      const json = sortJSON( json5.parse( input.value ) );

      output.value = JSON.stringify(
        json,
        undefined,
        shouldIndent && amountIndent
      );
    }
    catch ( error ) {
      errorDiv.textContent = error.message;
    }
  };

  prettyPrintInput.addEventListener(
    'change',
    updateFn
  );

  output.addEventListener(
    'click',
    () => {
      output.focus();
      output.select();
    }
  );

  indent.addEventListener(
    'change',
    updateFn
  );
  indent.addEventListener(
    'input',
    updateFn
  );

  input.addEventListener(
    'input',
    prettify
  );

  /* When duplicating a tab (in Firefox atleast)
    the browser copies the input values from the previous tab
    but that seems to happen delayed so we update the values
    on load (not DOMContentLoaded, fires too early) to make
    sure everything is correct after the browser updates
    the inputs
  */
  addEventListener(
    'load',
    updateFn,
    { once: true }
  );
} )();
