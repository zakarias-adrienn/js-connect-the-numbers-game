export function render(root, state) {
    let html = "<table>";
    html += state.board.map(renderRow).join("");
    html += "</table>";
    root.innerHTML = html;
}

function renderRow(row) {
    let html = "<tr>";
    html += row.map(renderTd).join("");
    html += "</tr>";
    return html;
}

function renderTd(field) {
    let html = "<td";
    if(field.color!==""){
        html += ` style="background-color:${field.color}"`;
    }
    html +=">";
    if(field.value!==0){
        html += field.value;
    }
    html += "</td>";
    return html;
}

export function renderList(gameList, root) {
    root.innerHTML = "";
    var id = 1;
    gameList = Array.from(gameList);
    for (const game of gameList) {
        root.innerHTML += `<li>
            ${id}
            <button data-id="${id}">Betölt</button>
        </li>`;
        ++id;
    }
}