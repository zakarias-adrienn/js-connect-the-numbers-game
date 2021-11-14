import { state } from "./game.js";

export function delegate(parent, type, selector, fn) {

    function delegatedFunction(e) {
        const handlerElement = this;
        const sourceElement = e.target;

        const closestElement = sourceElement.closest(selector);
        if (handlerElement.contains(closestElement)) {
            const delegatedElement = closestElement;
            fn.call(delegatedElement, e)
        }
    }

    parent.addEventListener(type, delegatedFunction);
}

export function getCoords(tdElement) {
    const trElement = tdElement.parentNode;
    const y = tdElement.cellIndex;
    const x = trElement.rowIndex;
    return { x, y };
}

export function colorConnectedToValue(value) {
    switch (value) {
        case 1: return "red";
        case 2: return "green";
        case 3: return "yellow";
        case 4: return "blue";
        case 5: return "orange";
        case 6: return "brown";
        case 7: return "gray";
        case 8: return "violet";
        case 9: return "#7FFF00";
        case 10: return "#00FFFF";
        case 11: return "#556B2F";
    }
}

export function fieldFromTd(tdElement) {
    const { x, y } = getCoords(tdElement);
    const field = state.board[x][y];
    return field;
}

export function isNeighbor(field, fromField) {
    if(field.x!==fromField.x && field.y!==fromField.y) return false;
    return true;
}