import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    SAVE_ITEMS(state, payload) {
      state.items = payload;
    }
  },
  actions: {
    getAllItems() {
      let documents = [];
      let that = this;
      db.collection("items")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            documents.push(doc.data())
          });
          that.commit('SAVE_ITEMS', documents);
        });
    }
  },
  modules: {
  }
})
