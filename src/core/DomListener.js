export class DomListener {
    constructor ($root) {
        if (!$root) {
            throw new Error('no $root provided to DomListener!')
        }
        this.$root = $root
    }
}