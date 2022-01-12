const CODES = {
    A: 65,
    Z: 90
}

function toColumn (text) {
    return `<div class="column">${text}</div>`
}

function createCell () {
    return `<div class="cell" contenteditable="true"></div>`
}

function createRow (content, number = '') {
    return `
    <div class="row">
        <div class="row-info">${number}</div>
        <div class="row-data">${content}</div>
    </div>
    `
}

export function createTable(rowsCount = 15) {
    
    const colsCount = CODES.Z - CODES.A + 1 //90 - 65
    const rows = []

    let cols = new Array(colsCount)
        .fill('')
        .map( (el, index) => {
            const code = CODES.A + index
            return toColumn(String.fromCharCode(code))
        })
        .join('')
    
    rows.push(createRow(cols))
    
    for (let i = 0; i <= rowsCount; i++) {
       
        let cells = new Array(colsCount)
            .fill('')
            .map( el => createCell())
            .join('')
            
        rows.push(createRow(cells, i)) 
        
    }

    return rows.join('')
}