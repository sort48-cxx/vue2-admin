import Vue from 'vue'
import Vuex from 'vuex'

import {
  getRequest
} from "../util/http";


Vue.use(Vuex);

const state = {
  adminInfo: {
    avatar: 'default.jpg'
  }
}
const mutations = {
  savaAdminInfo(state, adminInfo) {
    state.adminInfo = adminInfo;
  }
}
const actions = {
  async getAdminData({commit}) {
    getRequest("https://www.easy-mock.com/mock/5cf5ea75655e50670e7e554e/admin/getUser")
      .then(res => {
        if (res.data.status == 1) {
          commit('savaAdminInfo', res.data);
        } else {
          throw new Error(res.type)
        }
      })
  }

}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
