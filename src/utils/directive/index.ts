import { App } from "vue";

export default function Directive (app: App) {
    app.directive('focus', {
        mounted(el) {
            el.focus()
        }
    })
}