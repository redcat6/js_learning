const CODES = {
    A: 65,
    Z: 90
}

function toColumn (text, col) {
    return `<div class="column" data-type="resizable" data-col="${col}">
        ${text}
        <div class="col-resize" data-resize="col"></div>
    </div>`
}
function toCell (col, row) {
    return `<div class="cell" contenteditable="true" data-column="${col}" data-row="${row}"></div>`
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
function getCode (index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    
    const colsCount = CODES.Z - CODES.A + 1 //90 - 65
    const rows = []

    let cols = new Array(colsCount)
        .fill('')
        .map((_, index) => getCode(index))
        .map( (el, index) => toColumn(el, index))    
        .join('')
    
    rows.push(createRow(cols, null))
    
    for (let i = 0; i < rowsCount; i++) {
       
        let cells = new Array(colsCount)
            .fill('')
            .map( (_, index) => toCell(index, i + 1)) 
            .join('')     
        rows.push(createRow(cells, i + 1)) 
        
    }

    return rows.join('')
}