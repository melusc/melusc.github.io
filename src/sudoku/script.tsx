import 'preact/devtools';

import { render, h, Component, Fragment } from 'preact';

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
  focused: {
    row: number;
    col: number;
  };
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

  const clamp = (
    n: number, lower: number, upper: number
  ): number => n < lower
    ? lower
    : n > upper
      ? upper
      : n;

  const nextCell = (
    backwards: boolean, state: AppState
  ): void => {
    const { focused } = state;
    const { row, col } = focused;

    const direction = backwards
      ? -1
      : 1;

    const newCol = col + direction;
    focused.col = overflow(
      newCol,
      0,
      8
    );

    if ( newCol > 8 || newCol < 0 ) {
      const newRow = row + direction;
      focused.row = overflow(
        newRow,
        0,
        8
      );
    }
  };

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
    focused: {
      row: 0,
      col: 0,
    },
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
          <div class="close" onClick={this.dismissMobileWarning}>X</div>
          <div>
            Unfortunately, mobile devices aren&apos;t supported yet due to
            their lack of keyboard. Check back later.
          </div>
        </div>
      )}
      <div class="sudoku">
        {cells.map( (
          { content: row, key: rowKey }, rowIndex
        ) => (
          <Fragment key={rowKey}>
            {row.map( (
              { content, key, valid }, colIndex
            ) => (
              <div
                key={key}
                class={`cell${ valid
                  ? ''
                  : ' invalid-input' }${
                  focused
                  && focused.row === rowIndex
                  && focused.col === colIndex
                    ? ' focused-cell'
                    : ''
                }`}
                onClick={this.handleCellClick(
                  rowIndex,
                  colIndex
                )}
              >
                {content}
              </div>
            ) )}
          </Fragment>
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

  handleCellClick = (
    row: number, col: number
  ) => (): void => {
    this.setState( {
      focused: {
        row,
        col,
      },
    } as AppState );
  };

  handleKeyDown = ( event_: KeyboardEvent ) => {
    this.setState( produce( ( state: AppState ): void => {
      const key = event_.key.toLowerCase();

      const { focused } = state;

      const { row, col } = focused;

      switch ( key ) {
        case 'arrowdown':
        case 'arrowup': {
          // Using clamp feels more natural
          focused.row = clamp(
            row + ( key === 'arrowdown'
              ? 1
              : -1 ),
            0,
            8
          );
          break;
        }

        case 'arrowright':
        case 'arrowleft': {
          focused.col = clamp(
            col + ( key === 'arrowright'
              ? 1
              : -1 ),
            0,
            8
          );

          break;
        }

        case 'tab': {
          event_.preventDefault();

          const { shiftKey } = event_;

          nextCell(
            shiftKey,
            state
          );

          break;
        }

        case 'delete':
        case 'backspace': {
          this.#sudokuClass.clearCell(
            row,
            col
          );

          break;
        }

        default: {
          if ( ( /^[1-9]$/ ).test( key ) ) {
            this.#sudokuClass.setContent(
              row,
              col,
              key
            );

            nextCell(
              false,
              state
            );
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
