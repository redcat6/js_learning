import { DomListener } from "@core/DomListener";
import { $ } from "./dom";

export class ExcelComponent extends DomListener {
    constructor ($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
    }
    //возвращает шаблон компонента
    toHTML() {
        return ''
    }

    init () {
        this.initDOMListeners()
    }

    destroy () {
        this.removeDOMListeners()
    }
}