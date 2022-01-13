import { $ } from "../../core/dom"

export function resizeHandler ($root, event) {
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
            $root.findAll(`[data-column="${$parent.data.col}"]`)//cells resizing
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