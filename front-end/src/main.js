import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let data = {

  item: [],

  addToItem() {
    this.item.push({
      id: this.id,
      person: this.person,
      description: this.description,
      Owns: this.Owns,
    })
  },
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
