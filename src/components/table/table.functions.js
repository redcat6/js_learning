export function shouldResize (event) {
    return event.target.dataset.resize  //event.target.getAttribute('data-resize') = event.target.dataset.resize
}