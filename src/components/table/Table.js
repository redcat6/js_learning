import { ExcelComponent } from "@core/ExcelComponent"
import { createTable } from "./table.template"
import { resizeHandler } from "./table.resizing"
import { isCell, matrix, nextSelector, shouldResize } from "./table.functions"
import { TableSelection } from "./TableSelection"
import { $ } from "../../core/dom"

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    prepare () {
        this.selection = new TableSelection()
    }

    toHTML() {
        return createTable(22)
    }

    init () {
        super.init() //вызов родительского метода
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on("formula:input", text => {
            this.selection.current.text(text)
        })

        this.$on('formula:enter', () => {
            this.selection.current.focus()
        })
    }

    selectCell ($cell) {
        this.selection.select($cell)
         //transmit text to formula component
        this.$emit('table:input', $cell)
    }

    onMousedown (event) {
        
        if (shouldResize(event)) {
            resizeHandler (this.$root, event)
        }
        else if (isCell(event))  {
            const $target = $(event.target) 
            //group selection -?
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            }
            else {
               this.selection.select($target)  
            }
        }
    }
    onInput (event) {
        this.$emit('table:input', $(event.target))
    }
    onKeydown (event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)//{row, col}
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }
}



