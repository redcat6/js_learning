import { capitalize } from "./utils"

export class DomListener {
    constructor ($root, listeners=[]) {
        if (!$root) {
            throw new Error('no $root provided to DomListener!')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners () {
       this.listeners.forEach( listener => {
           const method = getMethodName(listener)
           if (!this[method]) {
               throw new Error(`Method ${method} is not implemented in ${this.name} Component`)
           }
           this[method] = this[method].bind(this)//bind передает контест и !создает новую функцию, поэтому this[method].bind(this) !== this[method]
           this.$root.on(listener, this[method]) 
       })
    }

    removeDOMListeners () {
        this.listeners.forEach( listener => {
            const method = getMethodName(listener)
            this.$root.remove(listener, this[method])
        }) 
    }
}

// pure function for input -> onInput
function getMethodName (eventName) {
    return 'on' + capitalize(eventName)
}
