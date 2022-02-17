export class Emmiter {
    constructor () {
        this.listeners = {}
    }
    //dispatch, fire, trigger
    //уведомляет слушаталей
    //@event - string name of event 
    emit (event, ...args) {
        //проверка на то, что это массив
        if (Array.isArray(!this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach( listener => {
            listener(...args)
        })
        return true
    }

    //on, listen
    //подписываемся на уведомления 
    //@event - string name of event,
    //fn - function (callback)
    subscribe (event, fn) {
        this.listeners[event] = this.listeners[event] || [] //array
        this.listeners[event].push(fn)
        //функция отписки от события
        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
        }
    }
}