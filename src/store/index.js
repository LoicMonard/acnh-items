import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: '',
    lists: '',
    currentItem: '',
    currentList: '',
    showDetailsModal: false,
    showListModal: false,
    user: [],
    selectedItems: []
  },
  mutations: {
    SAVE_ITEMS(state, payload) {
      state.items = payload;
    },
    SAVE_LISTS(state, payload) {
      state.lists = payload;
    },
    SAVE_CURRENT_ITEM(state, payload) {
      state.currentItem = payload;
    },
    SET_DETAILS_MODAL(state, payload) {
      state.showDetailsModal = payload;
    },
    SET_LIST_MODAL(state, payload) {
      state.showListModal = payload;
    },
    SET_USER(state, data) {
      state.user = data;
    },
    SELECT_ITEM(state, id) {
      state.selectedItems.push(id);
    },
    UNSELECT_ITEM(state, id) {
      const index = state.selectedItems.indexOf(id);
      state.selectedItems.splice(index, 1);
    },
    SET_CURRENT_LIST(state, payload) {
      state.currentList = payload;
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
    getAllLists() {
      let documents = [];
      let that = this;
      db.collection("lists")
        // .orderBy('name')
        .get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => Object.assign(doc.data(), {id: doc.id}))
          that.commit('SAVE_LISTS', documents);
        })
    },
    getItemById({commit}, payload) {
      const item = this.state.items.find(x => x.id === payload.id);
      console.log('Item' + item);
      this.commit('SAVE_CURRENT_ITEM', item);
    },
    setDetailsModal() {
      this.commit('SET_DETAILS_MODAL', !this.state.showDetailsModal);
    },
    setListModal() {
      this.commit('SET_LIST_MODAL', !this.state.showListModal);
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
    },
    selectItem({ commit }, id) {
      if (!this.state.selectedItems.includes(id)) {
        this.commit('SELECT_ITEM', id)
      } else {
        this.commit('UNSELECT_ITEM', id)
      }
    },
    createList({ commit }, payload) {
      const newObj = Object.assign(payload, { items: this.state.selectedItems })
      db.collection('lists')
      .add(newObj)
      .then(res => {
        this.$router.push({ path: `/lists/${res.id}` })
        console.log(res.id);
      })
      setCurrentList(newObj);
    },
    setCurrentList({ commit }, list) {
      this.commit('UNSELECT_ITEM', list)
    }
  },
  modules: {
  }
})
