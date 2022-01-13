import { ExcelComponent } from "@core/ExcelComponent"
import { createTable } from "./table.template"
import { $ } from "@core/dom"

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
        //event.target.getAttribute('data-resize') = event.target.dataset.resize

        if (event.target.dataset.resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            const type = $resizer.data.resize
            const sideProp = type === 'col'? 'bottom' : 'right'
            let value;
            
            $resizer.css({
                opacity: 1,
                [sideProp]: '-2000px'
            })

            document.onmousemove = (e) => {

                if (type === 'col') {
                    const delta = e.pageX - coords.right
                    value = delta + coords.width
                    $resizer.css({right: -delta + 'px'}) 
                }
                else {
                    const delta = e.pageY - coords.bottom
                    value = delta + coords.height
                    $resizer.css({bottom: -delta + 'px'})
                }
            }

            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null

                if (type === 'col') {
                    $parent.css({ width: value + 'px'})//column resizing
                    this.$root.findAll(`[data-column="${$parent.data.col}"]`)//cells resizing
                    .forEach(el => el.style.width = value + 'px') 
                }
                else {
                    $parent.css({height: value + 'px'})
                }

                $resizer.css({
                    opacity: 0,
                    bottom: 0,
                    right: 0
                })                
            }
        }   
    }

    onMouseup () {
        //console.log('mouseup')
    }
}