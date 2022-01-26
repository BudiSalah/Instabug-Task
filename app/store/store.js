import Vue from 'vue';
import Vuex from 'vuex';

import performance from './modules/performance.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    performance,
  },
});
