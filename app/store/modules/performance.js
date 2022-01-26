/* eslint-disable no-shadow */
import { axiosInstance } from '../../axiosInstance';

const state = () => ({
  performance: [],
  loaded: false,
});

const mutations = {
  set_performance(state, payload) {
    state.performance = payload;
  },
  set_loaded(state, payload) {
    state.loaded = payload;
  },
};

const actions = {
  set_performance({ state, commit }) {
    try {
      if (state.loaded) return;

      axiosInstance.get('/performance').then(({ data }) => {
        commit('set_performance', data);
        commit('set_loaded', true);
      });
    } catch (error) {
      console.warn(error);
      commit('set_performance', []);
      commit('set_loaded', false);
    }
  },
};

const getters = {
  performanceList(state) {
    return state.performance;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
