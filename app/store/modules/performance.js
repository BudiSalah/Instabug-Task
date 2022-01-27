/* eslint-disable no-shadow */
import { axiosInstance } from '../../axiosInstance';
import moment from 'moment';

const state = () => ({
  performance: [],
  loaded: false,
  dateRange: [],
});

const mutations = {
  set_performance(state, payload) {
    state.performance = payload;
  },
  set_loaded(state, payload) {
    state.loaded = payload;
  },
  set_dateRange(state, payload) {
    state.dateRange = payload;
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
  set_dateRange({ commit }, payload) {
    commit('set_dateRange', payload);
  },
};

const getters = {
  performanceList(state) {
    return state.performance;
  },
  performanceListFilter({ performance, dateRange }) {
    if (!performance?.length || !dateRange?.length) return;

    const startDate = moment(dateRange[0]).format('DD MMM YYYY');
    const endDate = moment(dateRange[1]).format('DD MMM YYYY');

    return performance.filter((item) => {
      return moment(item.date_ms).isBetween(startDate, endDate);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
