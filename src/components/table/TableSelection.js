import { $ } from "../../core/dom"

export class TableSelection {
    static className = 'selected'

    constructor () {
        this.group = []//private variable 
        this.current = null//first clicked cell 
    }
    //$el - instanceof Dom === true
    select ($el) {
        this.clear() 
        $el.focus().addClass(TableSelection.className)
        this.group.push($el)
        this.current = $el
    }

    clear () {
        this.group.forEach(el => el.removeClass(TableSelection.className))
        this.group = []
    }
    //$group - instanceof Dom === true
    selectGroup ($group = []) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }
}