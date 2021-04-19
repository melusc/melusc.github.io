import 'preact/devtools';

import { render, h, Component } from 'preact';

import { Sudoku } from './sudoku';

import { produce } from 'immer';

import type { Cells, NumberOnlySudoku } from './index';

interface Sudokus {
  easy: NumberOnlySudoku;
  evil: NumberOnlySudoku;
  expert: NumberOnlySudoku;
}

interface AppState {
  cells: Cells;
  error: undefined | string;
  focused: number;
  mobileWarningSeen: boolean;
}

( () => {
  const overflow = (
    n: number, lower: number, upper: number
  ): number => n < lower
    ? upper
    : n > upper
      ? lower
      : n;

  const _ = undefined; // Looks better, than loads of `undefined`

  const sudokus: Sudokus = {
    easy: [
      [ 5, _, 3, _, 9, 4 ],
      [ _, 9, _, _, 3, 6, 2, 5, 8 ],
      [ _, _, _, _, _, _, 3 ],
      [ _, _, 8, 9, 5, _, 6, 7 ],
      [],
      [ _, 7, 2, _, 6, 1, 4 ],
      [ _, _, 4 ],
      [ 6, 5, 9, 8, 2, _, _, 1 ],
      [ _, _, _, 1, 4, _, 5, _, 6 ],
    ],
    evil: [
      [ 6, _, 4, _, _, _, _, _, 3 ],
      [ _, _, _, _, 3, 7, 8 ],
      [ _, _, _, 5, _, _, 7 ],
      [ 8, 9, _, 1 ],
      [ 3, _, _, _, _, _, _, _, 2 ],
      [ _, _, _, _, _, 3, _, 1, 9 ],
      [ _, _, 5, _, _, 9 ],
      [ _, _, 1, 8, 6 ],
      [ 9, _, _, _, _, _, 4, _, 8 ],
    ],
    expert: [
      [ _, _, _, _, _, 4, _, _, 2 ],
      [ _, 6, _, 2, _, _, _, 3 ],
      [ _, 8, _, _, _, 3, 5, _, 9 ],
      [ _, 4, _, _, _, _, 1 ],
      [ 1, _, _, 7, _, 5 ],
      [ 5, _, 3 ],
      [ _, 9, _, 3 ],
      [ _, _, 4, _, 6, 1 ],
      [ _, _, 5, _, _, _, 7 ],
    ],
  };

  class App extends Component {
    #sudokuClass = new Sudoku( sudokus.evil );

    state: AppState = {
      cells: this.#sudokuClass.getCells(),
      error: undefined,
      focused: 0,
      mobileWarningSeen: false,
    };

    constructor( ...a: Array<Record<string, unknown>> ) {
      super( ...a );

      this.#sudokuClass.subscribe( (
        sudoku, type
      ) => {
        if ( type === 'change' ) {
          this.setState( {
            cells: sudoku.getCells(),
            error: undefined,
          } as AppState );
        }
        else if ( type === 'finish' ) {
          const isSolved = sudoku.isSolved();

          this.setState( {
            cells: sudoku.getCells(),
            error: isSolved
              ? undefined
              : "Sudoku wasn't solved completely.",
          } as AppState );
        }
        else {
          this.setState( {
            error: 'Sudoku is invalid',
          } as AppState );
        }
      } );
    }

    componentDidMount = () => {
      document.addEventListener(
        'keydown',
        this.handleKeyDown
      );
    };

    componentWillUnmount = () => {
      document.removeEventListener(
        'keydown',
        this.handleKeyDown
      );
    };

    dismissMobileWarning = () => {
      this.setState( {
        mobileWarningSeen: true,
      } as AppState );
    };

    render = (
      _properties: Record<string, unknown>,
      { cells, error, focused, mobileWarningSeen }: AppState
    ) => (
      <div class="App">
        {mobileWarningSeen || (
          <div class="is-mobile">
            <div class="close" onClick={this.dismissMobileWarning}>
              X
            </div>
            <div>
              Unfortunately, mobile devices aren&apos;t supported yet due to
              their lack of keyboard. Check back later.
            </div>
          </div>
        )}
        <div class="sudoku">
          {cells.map( (
            { content, key, valid, possible }, index
          ) => (
            <div
              key={key}
              class={`cell${ valid
                ? ''
                : ' invalid-input' }${
                focused === index
                  ? ' focused-cell'
                  : ''
              }`}
              onClick={this.handleCellClick( index )}
            >
              {content ?? [ ...possible ].join( ',' )}
            </div>
          ) )}
        </div>
        {typeof error !== undefined && <div class="error">{error}</div>}
        <button type="button" class="solve" onClick={this.solve}>
          Solve
        </button>
        <button type="button" class="clear" onClick={this.clear}>
          Clear
        </button>
      </div>
    );

    solve = () => {
      this.#sudokuClass.solve();
    };

    clear = () => {
      this.#sudokuClass.clearAllCells();
    };

    handleCellClick = ( index: number ) => (): void => {
      this.setState( {
        focused: index,
      } as AppState );
    };

    handleKeyDown = ( event_: KeyboardEvent ) => {
      this.setState( produce( ( state: AppState ): void => {
        const key = event_.key.toLowerCase();

        switch ( key ) {
          case 'arrowdown':
          case 'arrowup': {
            // Using clamp feels more natural

            const direction = key === 'arrowdown'
              ? 9
              : -9;
            let newFocused = state.focused + direction;

            if ( newFocused < 0 ) {
              newFocused += 81;
            }
            else if ( newFocused > 80 ) {
              newFocused -= 81;
            }

            state.focused = newFocused;

            break;
          }

          case 'arrowright':
          case 'arrowleft': {
            const direction = key === 'arrowright'
              ? 1
              : -1;

            const col = ( state.focused % 9 ) + direction;

            if ( col < 0 ) {
              state.focused += 8;
            }
            else if ( col > 8 ) {
              state.focused -= 8;
            }
            else {
              state.focused += direction;
            }

            break;
          }

          case ' ': {
            // Space

            this.#sudokuClass.clearCell( state.focused );

            state.focused = overflow(
              state.focused + 1,
              0,
              80
            );

            break;
          }

          case 'tab': {
            event_.preventDefault();

            const { shiftKey } = event_;

            const direction = shiftKey
              ? -1
              : 1;

            state.focused = overflow(
              state.focused + direction,
              0,
              80
            );

            break;
          }

          case 'delete':
          case 'backspace': {
            this.#sudokuClass.clearCell( state.focused );

            break;
          }

          default: {
            if ( ( /^[1-9]$/ ).test( key ) ) {
              this.#sudokuClass.setContent(
                state.focused,
                key
              );

              ++state.focused;

              if ( state.focused > 80 ) {
                state.focused = 0;
              }
            }
          }
        }
      } ) );
    };
  }

  render(
    <App />,
    document.body
  );
} )();
