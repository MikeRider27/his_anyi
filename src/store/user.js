import * as userInfo from './userInfo';
// Reloading the page no longer shows it mark!!!!
const state = {
  // User login state, stored in sessionStorage so it survives a reload
  // easeHis: sessionStorage.getItem('easeHis') ? JSON.parse(sessionStorage.getItem('easeHis')) : false,
  // easeHisType: sessionStorage.getItem('easeHisType') ? JSON.parse(sessionStorage.getItem('easeHisType')) : false
  easeHis: sessionStorage.getItem('easeHis') ? sessionStorage.getItem('easeHis') : false,
  easeHisType: sessionStorage.getItem('easeHisType') ? sessionStorage.getItem('easeHisType') : false
};

const actions = {
  /**
   * User login
   */
  setUserInfo ({commit}, res) { // res can be passed in from the page, changing the true orfalse
    sessionStorage.setItem('easeHis', res.name);
    sessionStorage.setItem('easeHisType', res.type);
    commit(userInfo.SET_LOGIN_NAME, res.name);
    commit(userInfo.SET_LOGIN_TYPE, res.type);
  },

  /**
   * Log out
   */
  setSignOut ({commit}) {
    sessionStorage.removeItem('easeHis');
    sessionStorage.removeItem('easeHisType');
    commit(userInfo.SET_LOGIN_NAME, false);
  }

};

const getters = {
  easeHis: state => state.easeHis,
  easeHisType: state => state.easeHisType
};

const mutations = {
  [userInfo.SET_LOGIN_TYPE] (state, type) {
    state.easeHisType = type;
  },
  [userInfo.SET_LOGIN_NAME] (state, name) {
    state.easeHis = name;
  }
};

export default {
  state, // State
  actions, // Commit mutations, can run async operations
  getters, // Perform operations on the data
  mutations// Mutate state (synchronous)
};
