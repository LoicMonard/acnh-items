import Vue from 'vue'
import Vuex from 'vuex'
import { db, FieldValue } from '../firebase/firebase'
import router from '../router/index'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: '',
    lists: [],
    currentItem: '',
    currentList: '',
    showDetailsModal: false,
    showListModal: false,
    showCreateListModal: false,
    showDeleteListModal: false,
    user: [],
    selectedItems: []
  },
  mutations: {
    SAVE_ITEMS(state, payload) {
      state.items = payload;
    },
    SAVE_LISTS(state, payload) {
      state.lists = state.lists.concat(payload);
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
    SET_CREATE_LIST_MODAL(state, payload) {
      state.showCreateListModal = payload;
    },
    SET_DELETE_LIST_MODAL(state, payload) {
      state.showDeleteListModal = payload;
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
    },
    ADD_TO_LIST(state, payload) {
      state.lists.push(payload);
    },
    DELETE_LIST(state) {
      const index = state.lists.indexOf(state.currentList);
      state.lists.splice(index, 1);
    }
  },
  actions: {
    getAllItems() {
      let documents = [];
      let that = this;
      // db.collection("items")
      //   .orderBy('name')
      //   .get()
      //   .then(querySnapshot => {
      //     const documents = querySnapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id } ))
      //     that.commit('SAVE_ITEMS', documents);
      //   })

      axios.get('https://us-central1-acnh-items.cloudfunctions.net/getAllItems')
        .then(res => {
          that.commit('SAVE_ITEMS', res.data.response);
        })
        .catch(err => {
          console.error(err);
        })
    },
    getAllLists() {
      let documents = [];
      let that = this;
      db.collection("lists")
        // .orderBy('name')
        .where("author.email", "==", that.state.user.email)
        .get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id }))
          that.commit('SAVE_LISTS', documents);
        })
    },
    getItemById({commit}, payload) {
      const item = this.state.items.find(x => x.id === payload.id);
      this.commit('SAVE_CURRENT_ITEM', item);
    },
    setDetailsModal() {
      this.commit('SET_DETAILS_MODAL', !this.state.showDetailsModal);
    },
    setListModal() {
      this.commit('SET_LIST_MODAL', !this.state.showListModal);
    },
    setCreateListModal() {
      this.commit('SET_CREATE_LIST_MODAL', !this.state.showCreateListModal);
    },
    setDeleteListModal() {
      this.commit('SET_DELETE_LIST_MODAL', !this.state.showDeleteListModal);
    },
    fetchUser({ commit, dispatch }, user) {
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
        dispatch("getAllLists");
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
    createList({ commit, dispatch }, payload) {
      const newObj = Object.assign(payload, { items: this.state.selectedItems })
      db.collection('lists')
      .add(newObj)
      .then(res => {
      })
      dispatch('setCurrentList', newObj);
      commit('ADD_TO_LIST', payload)
    },
    deleteList({ commit, dispatch }, payload) {
      console.log(this.state.currentList);
      if (this.state.user.email == this.state.currentList.author.email) {
        db.collection('lists')
          .doc(this.state.currentList.id)
          .delete()
          .then(doc => {
            this.commit('DELETE_LIST')
          })
      }
    },
    setCurrentList({ commit }, list) {
      this.commit('SET_CURRENT_LIST', list)
    },
    getCurrentList({ commit }, payload) {
      let that = this;
      db.collection("lists")
        .doc(payload.id)
        .get()
        .then(doc => {
          const document = Object.assign(doc.data(), { id: doc.id })
          that.commit('SET_CURRENT_LIST', document)
        })
    },
    addToList({ commit }, payload) {
      let that = this;
      db.collection("lists")
        .doc(payload.list.id)
        .update({
          items: payload.list.items.concat(that.state.selectedItems)
        })
        .then(doc => {
          const index = that.state.lists.indexOf(payload.list);
          that.state.lists[index].items = payload.list.items.concat(that.state.selectedItems);
        })
    }
  },
  modules: {
  }
})
