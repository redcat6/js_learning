import { DomListener } from "@core/DomListener";


export class ExcelComponent extends DomListener {
    constructor ($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        
        this.prepare ()
    }
    //настройка компонента до init()
    prepare () {}
    
    //возвращает шаблон компонента
    toHTML() {
        return ''
    }
    //уведомление слушателей о событии event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    //Подписка на событие event
    $on (event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    //инициализация компонента
    //добавление DOM listeners
    init () {
        this.initDOMListeners()
    }
    //удаление компонента
    //удаление DOM listeners
    destroy () {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}