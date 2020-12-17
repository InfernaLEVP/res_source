import 'babel-polyfill';

import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import InfoBlock from './components/InfoBlock.vue';
import VideoView from './components/VideoView.vue';

Vue.config.productionTip = false;

const routes = [
  {
    path: '/',
    name: 'Home',
    component: InfoBlock
  },
  {
    path: '/videoview',
    name: 'VideoView',
    component: VideoView
  }
];

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history'
});

window.app = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
