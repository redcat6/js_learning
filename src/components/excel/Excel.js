import { $ } from "../../core/dom"
import { Emmiter } from "../../core/Emitter"

export class Excel {
   constructor (selector, options) {
       this.$el = $(selector)
       this.components = options.components || []  
       this.emitter = new Emmiter() 
   }

   getRoot () {
        const $root = $.create('div', 'excel')//document.createElement('div') + $root.classList.add('excel')  
        const componentOptions = { 
            emitter: this.emitter//экземпляр emitter для связи между компонентами
        }   
        this.components = this.components.map( Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
   }

   render () {
       this.$el.append(this.getRoot())
       this.components.forEach(component => component.init())
   }

   destroy () {
       this.components.forEach(component => component.destroy())
   }
}