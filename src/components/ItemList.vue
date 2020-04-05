<template>
  <div class="item-list">
    <h1>
      <img src="../assets/item.png"/>
      {{ title }}
    </h1>
    <div class="actions">
      <div class="input-wrapper">
        <label>Rechercher par nom</label>
        <input 
          type="text" 
          v-model="search"/>
      </div>
      <button 
        class="filled"
        @click="contribute()"
        >
        Contribuer
      </button>
      <button 
        class=""
        @click="addToList()"
        >
          Ajouter à une liste
      </button>
    </div>
    <div class="items">
      <transition-group
        name="list" 
        tag="div" 
        class="container">
        <Item 
          class="item"
          v-for="item in items"
          :key="item.name"
          v-bind:data="item"/>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Item from '@/components/Item.vue'
import { db } from '../firebase/firebase.js'
import router from 'vue-router'
import { mapGetters } from 'vuex'

export default {
  name: 'items',
  components: {
    Item
  },
  data: () => ({
    search: '',
    defaultTitle: 'Liste de meubles'
  }),
  props: ["mode"],
  computed: {
    currentList() {
      return this.$store.state.currentList;
    },
    items() {
      if (this.mode === "list" && this.$store.state.items.length && this.$store.state.currentList) {
        return this.$store.state.items.filter(item => this.currentList.items.includes(item.id)).filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
      }
      else if (this.$store.state.items.length) {
        return this.$store.state.items.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
      }
    },
    title() {
      return this.currentList.name ? this.currentList.name : this.defaultTitle;
    }
  },
  methods: {
    getItemDetails(item) {
      console.log(item.id);
      this.$store.dispatch('getItemById', { id: item.id });
      this.$store.dispatch('setDetailsModal');
      // const itemId = this.items.find(x => x.name === 'Bambou').id;
      // this.$router.push({ path: `/details/${itemId}`, params: item})
    },
    contribute() {
      this.$router.push('/contribute');
    },
    addToList() {
      this.$store.dispatch('setListModal');
    }
  },
  mounted() {
    if (!this.currentList && this.mode === "list") {
      this.$store.dispatch('getCurrentList', { id: this.$route.params.id })
      // console.log(this.$route.params.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.item-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  input {
    width: 200px;
  }
  h1 {
    text-align: left;
    display: flex;
    align-items: center;
    img {
      margin-right: 8px;
    }
  }
  .actions {
    display: flex;
    align-items: flex-end;
    > * {
      margin-right: 8px;
    }
    .input-wrapper {
      display: flex;
      flex-direction: column;
    }
    button {
      margin-bottom: 10px;
    }
  }
  .items {
    display: flex;
    .container {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
.item {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
.list-leave-active {
  position: absolute;
}
</style>