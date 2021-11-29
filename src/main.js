import Vue from 'vue'
import App from './App.vue'
import FoundationCss from 'foundation-sites/dist/css/foundation.min.css'
import FoundationJs from 'foundation-sites'

Vue.config.productionTip = false

new Vue({
  FoundationCss,
  FoundationJs,
  render: h => h(App),
}).$mount('#app')
