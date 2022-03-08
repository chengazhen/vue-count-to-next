import CountTo from './CountTo.vue'

export default {
  install(app: import('vue').App<any>): void {
    app.component('CountTo', CountTo)
  }
}
