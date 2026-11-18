import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/es';
import 'element-ui/lib/theme-chalk/index.css';
import './common/stylus/forms.styl';
// Element UI defaults to Chinese for its built-in texts (pagination, date pickers, empty tables)
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

// Check login status, route guard (registered before the root instance so the first navigation is checked too)
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !sessionStorage.getItem('easeHis')) {
    next({path: '/login'});
  } else if (to.path === '/internal') {
    next({path: '/home'});
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
