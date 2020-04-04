import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: '',
    currentItem: '',
    showModal: false,
    user: []
  },
  mutations: {
    SAVE_ITEMS(state, payload) {
      state.items = payload;
    },
    SAVE_CURRENT_ITEM(state, payload) {
      state.currentItem = payload;
    },
    SET_MODAL(state, payload) {
      state.showModal = payload;
    },
    SET_USER(state, data) {
      state.user = data;
    }
  },
  actions: {
    getAllItems() {
      let documents = [];
      let that = this;
      db.collection("items")
        // .orderBy('name')
        .get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data())
          that.commit('SAVE_ITEMS', documents);
        })
    },
    getItemById({commit}, payload) {
      const item = this.state.items.find(x => x.id === payload.id);
      console.log('Item' + item);
      this.commit('SAVE_CURRENT_ITEM', item);
    },
    setModal() {
      this.commit('SET_MODAL', !this.state.showModal);
    },
    fetchUser({ commit }, user) {
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", []);
      }
    }
  },
  modules: {
  }
})
