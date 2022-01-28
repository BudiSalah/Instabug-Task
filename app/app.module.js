import Vue from 'vue';
import store from './store/store.js';
import 'ngVue';
import 'ngVue/build/plugins.js';
import PerformancePageComponent from './pages/performance-page.vue';
import PerformanceChartComponent from './components/vue-components/performance-chart.vue';
import FiltersComponent from './components/vue-components/Filters.vue';
import FofPage from './pages/404.vue';

angular
  .module('appModule', [
    'ui.router',
    'ngVue',
    'ngVue.plugins',
    require('angular-sanitize'),
  ])
  .config(($ngVueProvider) => {
    $ngVueProvider.setRootVueInstanceProps({
      store: store,
    });
  })
  .value('FiltersComponent', FiltersComponent);

angular
  .module('appModule')
  .directive('vPerformancePage', (createVueComponent) => {
    return createVueComponent(
      Vue.component('performancePageComponent', PerformancePageComponent)
    );
  });

angular
  .module('appModule')
  .directive('vPerformanceChart', (createVueComponent) => {
    return createVueComponent(
      Vue.component('performanceChartComponent', PerformanceChartComponent)
    );
  });

angular.module('appModule').directive('fofPage', (createVueComponent) => {
  return createVueComponent(Vue.component('Fof', FofPage));
});
