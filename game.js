import { State } from "./state.js";
import { render, renderList } from "./render.js";
import { getCoords, delegate, colorConnectedToValue, fieldFromTd, isNeighbor } from "./utils.js";

// tábla beállítása
export const state = new State();
const main = document.querySelector("main");

//mentett játékállások listája
const ul = document.querySelector("ul#saved");
const difficulty = localStorage.getItem("difficulty");
let games = JSON.parse(localStorage.getItem(difficulty)) || [];

if (main) {
    state.setBoard(localStorage.getItem("difficulty"));
    render(main, state);
    renderList(games, ul);
}

const output = document.querySelector("output");

// éppen használt szín
let currentColor = "";
let lineStartTd = null;
let lineStartField = null;

// útvonal kezdete egy számon való egérlenyomáskor
function handleMouseDown(event) {
    output.innerHTML = "";
    event.preventDefault();
    const field = fieldFromTd(this);
    const value = field.value;
    // ha nem számból próbálunk elindulni, akkor semmi ne történjen
    if (value === 0) {
        return;
    }
    currentColor = colorConnectedToValue(value);
    // ha másik útvonalat akarok húzni a számból
    for (let x = 0; x < state.board.length; ++x) {
        for (let y = 0; y < state.board.length; ++y) {
            if (state.board[x][y].color === currentColor) {
                state.board[x][y].color = "";
                state.board[x][y].hasBeenTouched = false;
            }
        }
    }
    field.color = currentColor;
    field.hasBeenTouched = true;
    lineStartTd = this;
    lineStartField = fieldFromTd(lineStartTd);
    render(main, state);
}
if (main) {
    delegate(main, "mousedown", "td", handleMouseDown);
}

// vonal húzása
// TODO: közepéig el kellene menjen, csak akkor szineződjön
function handleMouseOver(event) {
    if (event.buttons !== 1) {
        return;
    }
    const from = event.relatedTarget;
    if (!from.closest("td")) {
        return;
    }
    const fromField = fieldFromTd(from);
    if (fromField.color === "") {
        return;
    }
    const field = fieldFromTd(this);
    // nem hosszabbodik meg a vonal rossz számmezőn
    if(field.value!==0 && field.value!==lineStartField.value){
        return;
    }
    
    // vonal keresztezésekor ne folytatódjon a vonalhúzás
    if(fromField.color!==currentColor){
        return;
    }
    if (!isNeighbor(field, fromField))  {
        return;
    }
    // ha a másik vonalat kereszteznénk
    if(field.color!==""){
    // visszafele
        if (fromField !== field && fromField.color === field.color && field.hasBeenTouched) {
            fromField.color = "";
            fromField.hasBeenTouched = false;
        }
    }else{
        field.color = currentColor;
    }
    field.hasBeenTouched = true;
    render(main, state);
}
if (main) {
    delegate(main, "mouseover", "td", handleMouseOver);
}

function handleMouseUp(event) {
    checkWin();
    // ha nem bal klikk
    if (event.button !== 0) {
        return;
    }
    const field = fieldFromTd(this);
    if(!lineStartField){
        return;
    }
    if (lineStartField === field || lineStartTd.innerHTML !== this.innerHTML) {
        for (let x = 0; x < state.board.length; ++x) {
            for (let y = 0; y < state.board.length; ++y) {
                if (state.board[x][y].color === currentColor) {
                    state.board[x][y].color = "";
                    state.board[x][y].hasBeenTouched = false;
                }
            }
        }
    } else {
        currentColor = "";
    }
    render(main, state);
}
if (main) {
    delegate(main, "mouseup", "td", handleMouseUp);
}

function checkWin() {
    for (let x = 0; x < state.board.length; ++x) {
        for (let y = 0; y < state.board.length; ++y) {
            if (state.board[x][y].color === "") {
                return;
            }
        }
    }
    output.innerHTML = "Gratulálunk! Ön nyert!<br>";
    output.innerHTML += `<a href="index.html">Vissza a főoldalra</a>`;
}

function handleRightClick(event) {
    event.preventDefault();
    const field = fieldFromTd(event.target);
    const color = field.color;
    if (color) {
        for (let x = 0; x < state.board.length; ++x) {
            for (let y = 0; y < state.board.length; ++y) {
                if (state.board[x][y].color === color) {
                    state.board[x][y].color = "";
                    state.board[x][y].hasBeenTouched = false;
                }
            }
        }
    }
    render(main, state);
}
if(main){
    delegate(main, "contextmenu", "td", handleRightClick);
}

const link = document.querySelector("a#save");

function handleClickLink(){
    //localStorage.removeItem(difficulty);
    let games = JSON.parse(localStorage.getItem(difficulty)) || [];
    // ellenőrizni hogy már van-e ilyen játékállás mentve
    let putIn = true;
    let i = 0;
    for(let game of games){
        games = Array.from(games);
        if(JSON.stringify(game)===JSON.stringify(state.board)){
            if (confirm("Van már ilyen játékállás. Felül akarod írni?")) {
                putIn = true;
                games.splice(i, 1);
            } else {
                putIn = false;
            }
        }
        ++i;
    }
    if(putIn){
        games.push(state.board);
    }
    // megjeleníteni
    renderList(games, ul);
    // tárolni
    localStorage.setItem(difficulty, JSON.stringify(games));
}

if(link){
    link.addEventListener("click", handleClickLink);
}


// pályák visszatöltése
function handleGametoTable(){
    games = JSON.parse(localStorage.getItem(difficulty)) || [];
    output.innerHTML = "";
    if (!event.target.dataset.id) {
        return;
    }
    var id = event.target.dataset.id;
    const game = games[id-1];
    state.board = game;
    render(main, state);
    checkWin();
}

if(ul){
    ul.addEventListener("click", handleGametoTable);
}

