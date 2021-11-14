import { Field } from "./field.js";

const easy_matrix = [
    [0, 0, 0, 2, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 2, 0, 0],
    [3, 0, 0, 3, 0],
    [1, 0, 0, 0, 0]
];
const medium_matrix = [
    [2, 0, 0, 9, 0, 0, 0, 5, 0],
    [1, 0, 0, 8, 0, 11, 0, 0, 5],
    [0, 2, 0, 0, 6, 0, 7, 0, 0],
    [0, 0, 0, 0, 0, 11, 0, 10, 0],
    [0, 0, 0, 7, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 6],
    [0, 9, 0, 4, 8, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 10, 3]
];
const hard_matrix = [
    [1, 0, 0, 0, 3, 0, 5, 0, 2],
    [0, 0, 0, 0, 0, 0, 8, 5, 0],
    [7, 4, 0, 6, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 8],
];

export class State {
    board = [];
    constructor() {
    }
    setBoard(difficulty) {
        switch (difficulty) {
            case "easy": {
                for (let x = 0; x < easy_matrix.length; ++x) {
                    this.board.push([]);
                    for (let y = 0; y < easy_matrix.length; ++y) {
                        this.board[x][y] = new Field(easy_matrix[x][y], x, y, "");
                    }
                }
                break;
            }
            case "medium": {
                for (let x = 0; x < medium_matrix.length; ++x) {
                    this.board.push([]);
                    for (let y = 0; y < medium_matrix.length; ++y) {
                        this.board[x][y] = new Field(medium_matrix[x][y], x, y, "");
                    }
                }
                break;
            }
            case "hard": {
                for (let x = 0; x < hard_matrix.length; ++x) {
                    this.board.push([]);
                    for (let y = 0; y < hard_matrix.length; ++y) {
                        this.board[x][y] = new Field(hard_matrix[x][y], x, y, "");
                    }
                }  
                break;           
            }
        }
    }

}