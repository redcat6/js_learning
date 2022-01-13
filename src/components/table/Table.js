import { ExcelComponent } from "@core/ExcelComponent"
import { createTable } from "./table.template"
import { resizeHandler } from "./table.resizing"
import { shouldResize } from "./table.functions"

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['click', 'mousedown', 'mouseup']
        })
    }
    toHTML() {
        return createTable(22)
    }

    onClick () {
        //console.log('click')
    }

    onMousedown (event) {
        
        if (shouldResize(event)) {
            resizeHandler (this.$root, event)
        }   
    }

    onMouseup () {
        //console.log('mouseup')
    }
}