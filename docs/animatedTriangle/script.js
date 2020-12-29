'use strict';

/* global preact: false */

const { render, Component, h } = preact;

class Main extends Component {
  static render(
    _props, { posX, colour }
  ) {
    return h(
      'svg',
      {
        fill: `hsl(${ colour }, 100%, 70%)`,
        stroke: '#000',
        'stroke-linejoin': 'round',
        'stroke-width': 1.5,
        viewBox: '0 0 256 256',
      },
      h(
        'path',
        { d: `M${ posX } 10L246 246H10z` }
      )
    );
  }

  frame() {
    const range = ( new Date().getTime() / 16 ) % 256;
    //                                    ^ for the speed, bigger is slower
    //                                         ^ range, 0 to 255
    /* doing this instead of perfomance.now and DOMHighResTimeStamp
       because has the same effect but when refreshing the page
       it continues with the same position and color
    */

    const colour = ( range / 255 ) * 360; // turn 0 to 255 into 0 to 359

    /* eslint-disable */
    // prettier-ignore
    const posX = 
      (
        (
          Math.abs(
            (range / 255) * 256 // turn [0, 255] into [0, 256]
            - 128 // turn [0,256] into [-128, 128]
          ) * 2 /* turn [-128, 128] into [0, 256] with abs and * 2
                   but it now behaves like animation-direction: alternate
                   going 0, 1 (..) 255, 256, 255 (..), 1, 0, 1 (..)
                   instead of 0, 1 (..) 255, 256, 0, 1 (..)
                */
        )
        / 256 ) * 236 + 10; // turn [0, 256] into [10, 246] for the padding
    // same as ((Math.abs((range / 255) * 256 - 128) * 2) / 256) * 236 + 10;
    /* eslint-enable */

    this.setState( { posX, colour } );

    requestAnimationFrame( this.frame );
  }

  componentDidMount() {
    this.frame();
  }
}

render(
  h( Main ),
  document.body
);
