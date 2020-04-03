import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: '',
    currentItem: ''
  },
  mutations: {
    SAVE_ITEMS(state, payload) {
      state.items = payload;
    },
    SAVE_CURRENT_ITEM(state, payload) {
      state.currentItem = payload;
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
    }
  },
  modules: {
  }
})
