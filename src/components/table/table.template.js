const CODES = {
    A: 65,
    Z: 90
}

function toColumn (col, index) {
    return `<div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>`
}
/* function toCell (col, row) {
    return `<div 
        class="cell"
        contenteditable="true"
        data-column="${col}"
        data-id="${row}:${col}">
    </div>`
} */
//реализация через функцию-замыкание
function toCell (row) {
    return function (_, col) {
        return `<div class="cell" 
        contenteditable="true" 
        data-column="${col}" 
        data-id="${row}:${col}"
        data-type="cell">
        </div>` 
    }
}

function createRow (content, number) {
    const resize = number ? `<div class="row-resize" data-resize="row"></div>` : ''
    return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${number ? number : ''}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `
}
function getCode (_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    
    const colsCount = CODES.Z - CODES.A + 1 //90 - 65
    const rows = []

    let cols = new Array(colsCount)
        .fill('')
        .map(getCode)
        .map(toColumn)    
        .join('')
    
    rows.push(createRow(cols, null))
    
    for (let row = 0; row < rowsCount; row++) {
       
        let cells = new Array(colsCount)
            .fill('')
            .map(toCell(row)) 
            .join('')     
        rows.push(createRow(cells, row + 1)) 
        
    }

    return rows.join('')
}