import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'


// import axios from "axios";
import request from "@/utils/request";

import router from './router'
import store from "@/store";
// import * as echarts from 'echarts'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: "mini" });


Vue.prototype.request = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
