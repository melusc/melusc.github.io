import 'preact/devtools';

import { render, h, Component } from 'preact';

import { Sudoku } from './sudoku';

import type { Cells, NumberOnlySudoku } from './index';

interface AppState {
  cells: Cells;
  error: undefined | string;
}

interface Sudokus {
  easy: NumberOnlySudoku;
  evil: NumberOnlySudoku;
}

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
};

class App extends Component {
  #sudokuClass = new Sudoku( sudokus.easy );

  state: AppState = {
    cells: this.#sudokuClass.getCells(),
    error: undefined,
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

  render = (
    _properties: Record<string, unknown>,
    { cells, error }: AppState
  ) => (
    <div class="App">
      <div class="sudoku">
        {cells.map( (
          { content: row, key: rowKey }, rowIndex
        ) => (
          <div key={rowKey} class="row">
            {row.map( (
              { content, key, valid }, colIndex
            ) => (
              <div key={key} class="cell">
                <input
                  value={content}
                  class={valid
                    ? ''
                    : 'invalid-input'}
                  onInput={this.updateCells(
                    rowIndex,
                    colIndex
                  )}
                />
              </div>
            ) )}
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

  updateCells = (
    row: number, col: number
  ) => ( event_: Event ) => {
    const target = event_.target as HTMLInputElement;
    if ( target ) {
      const content = target.value.trim();

      if ( content === '' ) {
        this.#sudokuClass.clearCell(
          row,
          col
        );
      }
      else {
        this.#sudokuClass.setContent(
          row,
          col,
          content
        );
      }
    }
  };
}

render(
  <App />,
  document.body
);
