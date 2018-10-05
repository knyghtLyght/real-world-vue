import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//Lodash is a utility lib that assits us in working with arrays
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

//webpack function that builds an object based on the Regex given
const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

//Create an array based on the object above focused on filename
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  //Use lodash methods to convert from kabob case to pascel case and clean up the names
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  );

  //Register the components given to us by the array above
  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
